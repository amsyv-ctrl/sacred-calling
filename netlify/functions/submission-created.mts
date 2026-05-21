declare const Netlify: { env: { get(name: string): string | undefined } };

const MAILERLITE_API_URL = "https://connect.mailerlite.com/api/subscribers";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const body = await parseJson(req);
  const result = await syncContactSubmission(body);

  return json(result.payload, result.status);
};

async function syncContactSubmission(body: any) {
  const apiToken = Netlify.env.get("MAILERLITE_API_TOKEN");
  const groupId = Netlify.env.get("MAILERLITE_GROUP_ID");
  const googleSheetsWebhookUrl = Netlify.env.get("GOOGLE_SHEETS_WEBHOOK_URL");

  if (!apiToken || !groupId || !googleSheetsWebhookUrl) {
    return {
      status: 500,
      payload: { ok: false, error: "Contact sync is not configured" },
    };
  }

  const submission = normalizeSubmission(body);
  const data = submission.data || {};
  const email = clean(data.email || submission.email);

  if (!email) {
    return {
      status: 400,
      payload: { ok: false, error: "Missing email" },
    };
  }

  const firstName = clean(data["first-name"] || submission.first_name);
  const lastName = clean(data["last-name"] || submission.last_name);
  const organization = clean(data["ministry-organization"] || data.organization);
  const sheetsResult = await syncGoogleSheets(googleSheetsWebhookUrl, submission);
  const mailerLiteResult = await syncMailerLite(apiToken, groupId, {
    email,
    firstName,
    lastName,
    organization,
  });

  return {
    status: 200,
    payload: {
      ok: true,
      email,
      google_sheets: sheetsResult.ok,
      mailerlite_id: mailerLiteResult.mailerLiteId,
    },
  };
}

async function syncGoogleSheets(webhookUrl: string, submission: any) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    console.error("Google Sheets sync returned a non-OK status", response.status);
  }

  return { ok: response.ok, status: response.status };
}

async function syncMailerLite(
  apiToken: string,
  groupId: string,
  subscriber: {
    email: string;
    firstName: string;
    lastName: string;
    organization: string;
  },
) {
  const response = await fetch(MAILERLITE_API_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: subscriber.email,
      groups: [groupId],
      fields: {
        name: subscriber.firstName,
        last_name: subscriber.lastName,
        company: subscriber.organization,
      },
    }),
  });

  const result = await safeResponseJson(response);

  if (!response.ok) {
    console.error("MailerLite sync failed", response.status, result);
    throw new Error(`MailerLite sync failed with status ${response.status}`);
  }

  return { mailerLiteId: result?.data?.id || result?.id || null };
}

async function parseJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

function normalizeSubmission(body: any) {
  return (
    body?.payload?.data ? body.payload :
    body?.payload?.submission ? body.payload.submission :
    body?.payload?.form_submission ? body.payload.form_submission :
    body?.submission ? body.submission :
    body || {}
  );
}

async function safeResponseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function clean(value: unknown) {
  return String(value || "").trim();
}

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
