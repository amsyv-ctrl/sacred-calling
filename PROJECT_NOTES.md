# Sacred Calling Project Notes

Read this first when starting a new Sacred Calling thread.

## Purpose

Sacred Calling is a Christ-centered nonprofit initiative for Christian leaders. The site should feel warm, pastoral, clear, practical, and brand-consistent. Avoid overpromising. Use "Dr. Davenport" where appropriate, and use "Bryan and Laura" when referring to their shared ministry.

Core ministry language from Dav: Sacred Calling provides encouragement, connection, and accountability for Christian leaders through spiritual care, mentorship, coaching, speaking/travel ministry, gatherings, and future events.

## Current Website

- Main file: `index.html`
- Current local preview: open `index.html` directly in the browser.
- Standalone/reference export: `Sacred Calling - Standalone.html`
- Visual assets live in `uploads/`.
- The site is a static HTML/CSS/JS site with Netlify Forms and Netlify functions.
- Preserve the current visual language: refined pastoral tone, navy/gold/sand palette, serif display headings, spacious sections, restrained CTAs.

## Internal Project Hub

- Editable hub source: `project-hub/`
- The hub is a separate React/vinext application for orienting contributors to Sacred Calling's systems and working rhythm.
- Local preview: from `project-hub/`, run `npm install` once and then `npm run dev`.
- Production build check: from `project-hub/`, run `npm run build`.
- The hub is intentionally excluded by `.netlifyignore`, so deploying the main static website does not publish or overwrite it.
- Do not place passwords, access tokens, donor information, or other sensitive account details in the hub.
- Replace the provisional system notes with approved direct links and named owners before treating the hub as the final internal reference.

## Key Site Sections

- Hero: Sacred Calling ministry overview and main CTAs.
- Mission / Purpose: "Follow Me. Feed Them." and ministry purpose.
- What We Do: spiritual direction, mentorship and formation, biblical counseling, gatherings and community.
- Booking: Zoom Scheduler embed for Dr. Davenport mentorship/spiritual coaching.
- Events: currently "check back soon" language only. Do not invent placeholder events.
- Speaking: Bryan and Laura speaking ministry section with detailed request form.
- Partner / Giving: Zeffy giving is live through modal-enabled links with a normal link fallback.
- Contact list: primary conversion path for updates, encouragement, spiritual formation resources, ministry updates, and future opportunities.

## Booking / Zoom

- Current scheduler URL:
  `https://scheduler.zoom.us/bryan-davenport/30-mins-with-bryan`
- Current embed URL:
  `https://scheduler.zoom.us/bryan-davenport/30-mins-with-bryan?embed=true`
- Earlier placeholder Zoom scheduler belonged to Yisrael and should not be restored.
- Per Dav (2026-07-29): the offering is named "Personal Encouragement Session"; the booking section's large heading reads "Spiritual Direction & Coaching" (not "mentorship"). Dav's framing: he is offering to meet with, listen to, encourage, and pray with people.
- Site CTAs for this offering now read "Book a Session" (nav, mobile nav, hero).
- Per Dav (2026-07-30): all remaining "mentorship/mentoring" language sitewide was replaced with "coaching" (meta descriptions, hero, What We Do card, gatherings copy, community/partner sections, contact-form interest option "Coaching & Formation", footer). Do not reintroduce "mentorship" in site copy.

## Giving / Nonprofit Language

Sacred Calling's federal 501(c)(3) nonprofit status is approved.

Current website language:

> Sacred Calling is a federally recognized 501(c)(3) nonprofit organization. Contributions are tax-deductible to the extent permitted by law.

Giving is handled through Zeffy:

`https://www.zeffy.com/embed/donation-form/donate-to-sacred-calling?modal=true`

Website giving links use Zeffy's modal embed and retain the Zeffy URL as a direct-link fallback if the embed script is unavailable.

## Forms And Contact Capture

The main contact form and speaking form are Netlify forms in `index.html`.

The contact-list form uses `name="interest"` and the speaking form uses `name="speaking-request"`. Both use the shared `handleSubmit(event)` behavior. Keep the names distinct so Netlify preserves the correct fields for each form.

Netlify functions:

- `netlify/functions/submission-created.mts`
- `netlify/functions/sync-mailerlite.mts`

Expected environment variables:

- `MAILERLITE_API_TOKEN`
- `MAILERLITE_GROUP_ID`
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `MAILERLITE_WEBHOOK_SECRET` for the webhook sync endpoint

Forms are intended to sync to MailerLite and Google Sheets through the existing Netlify/Google Sheets process.

## Email And MailerLite

- Sender identity configured in MailerLite: `Sacred Calling <contact@sacredcalling.org>`
- MailerLite custom HTML launch email file:
  `email-templates/sacred-calling-launch-email.html`
- MailerLite custom HTML editor path:
  `Campaigns -> Create campaign -> Regular campaign -> Start from scratch -> Custom HTML editor`
- Custom HTML emails must include MailerLite's unsubscribe variable:
  `{$unsubscribe}`

The launch email was loaded into a MailerLite draft campaign on 2026-05-28. Verify current MailerLite state before claiming it is still present or ready to send.

## Domain And Sacred Calling Email

Important: verify live DNS/account state before making claims or changes.

Known project context:

- `contact@sacredcalling.org` is now a Google Workspace Gmail inbox.
- Netlify notifications for both the contact-list and speaking forms route to this address.
- The older duplicate Netlify notifications to Dav's Acts address and Yisrael's Gmail were removed on July 23, 2026.
- Website DNS records that should be left intact:
  - `A @ 75.2.60.5`
  - `CNAME www sacredcalling.netlify.app.`

## Deployment

The site has been deployed through Netlify in prior work. Before saying something is live, verify the current Netlify project/deploy state or the production URL.

Do not assume local `index.html` changes are deployed until they are committed/pushed/deployed.

## Current Open Questions

- Review Zeffy's giving records, recurring-partner flow, receipts, and reporting.
- Decide whether partners receive any access benefit, or whether everyone on the contact list receives the same regular content.
- Decide pricing and payment flow for individual mentorship/spiritual coaching appointments.
- Review speaking request form fields and recipient routing periodically.
- Confirm who owns ongoing MailerLite content creation and sending.
- Confirm event strategy before adding events beyond "announced soon."

## School of Faith

Dav's formal vision document is stored at:

`uploads/School of Faith/Sacred Calling School of Faith - Program Proposal.docx`

A working summary and reconciliation checklist is stored at:

`uploads/School of Faith/README.md`

The proposal describes a 3-year modular cohort program with 15 Saturday seminars across 4 tracks:

- Foundations of Faith and Scripture
- Systematic Theology
- Biblical Surveys and Church History
- Culture, Worldviews, and Practical Ministry

Each proposed seminar includes a 9:00 AM-12:00 PM lecture block and a 1:00 PM-3:00 PM practicum. Sessions would be recorded, materials retained, and elective seminars offered alongside the core schedule. The proposal lists a price of $99 per seminar.

Before publishing or building registration, reconcile the proposal with earlier call notes. In particular, the proposal names *The Portable Seminary (Second Edition)* as its textbook basis, while the call notes said no textbooks. Also confirm the 2027 launch timing, five-seminar annual minimum, Gabrielle's point-person role, Austin and Gabby's roles, Titus 1:1 as the guiding Scripture, no grades or formal tracking, Heritage venue/storage, and recorded-material pricing.

## Dav Call Notes - 2026-07-23

These are working notes to unpack into a communications plan, website updates, and repeatable ministry processes.

### Launch Communication

- Prepare a Sacred Calling announcement email.
- Create a shareable social media post/link that can be easily forwarded.
- Clearly explain:
  - What Sacred Calling is.
  - What Sacred Calling does.
  - How Sacred Calling serves leaders, couples, churches, and ministry teams.
  - How people can become financial partners and support the mission.
- Keep the invitation warm, clear, Christ-centered, and practical.

### Website Introduction Video

- Add a video from Dav to the website.
- The video should introduce Sacred Calling, explain its purpose and ministry, and invite people to get involved.
- Define the filming brief, target length, placement on the website, transcript/captions, thumbnail, and call to action before production.

### Partner And Giving Records

- Confirm what records and reporting the current giving platform provides for partners and recurring gifts.
- Determine what Sacred Calling needs to track outside the giving platform, if anything.
- Decide whether giving data should remain solely in the platform or also sync to a simple internal partner record.
- Protect donor information and avoid unnecessary duplication of financial data.

### Regular Encouragement From Dav

- Dav would like to send regular encouraging statements or ministry reflections.
- Build a manageable editorial calendar for him.
- Decide the content rhythm, likely topics, format, and approval process.
- Possible formats include short written encouragement, a brief video, an article, or a link to a message.

### Proposed Content Process

1. Dav records a video or prepares a written encouragement.
2. Dav sends the video to Austin for editing/production.
3. The final asset and supporting copy come back to the Sacred Calling team.
4. The team prepares the MailerLite email and any social post.
5. Dav or the designated approver reviews the final communication.
6. The team sends it to the appropriate audience and archives the asset for future website/resource use.

### Audience Lists And Permissions

- Identify possible existing audiences, including church and School of Ministry contacts.
- Before importing or emailing any list, confirm who owns it, how consent was collected, and whether Sacred Calling has permission to contact those people.
- Keep Sacred Calling subscribers distinct from partner/donor records, while allowing appropriate tags or groups for:
  - General Sacred Calling contact list.
  - Financial partners.
  - Mentorship/coaching interest.
  - Speaking and event interest.
  - School of Faith interest.
- The current direction remains that regular encouragement should be available to everyone who opts in; financial partnership does not need to create a separate content tier.

### Follow-Up Decisions

- Approve the announcement email and social launch message.
- Create the website video brief and recording deadline.
- Review the current giving platform's partner reporting and export options.
- Monitor the live Zeffy donor flow and confirm reporting meets Sacred Calling's needs.
- Obtain access to updated ministry and team photos from Dav's team, then select and optimize the final website images.
- Choose a realistic content cadence for Dav.
- Confirm Austin's role and handoff requirements.
- Confirm which church or ministry lists may legally and appropriately be invited to opt in.
- Create an opt-in-first migration plan for any external contacts that should not be directly imported.

## Working Guidelines For Future Threads

- Start by reading this file, then inspect the specific files involved.
- Preserve the brand tone and design; do not introduce a new style.
- Keep copy concise, pastoral, and practical.
- Do not break Netlify forms, form names, hidden fields, or the `handleSubmit` flow.
- Avoid fake events, fake testimonials, fake stats, or unsupported tax claims.
- Verify live account state for Netlify, MailerLite, Google Workspace, DNS, and Zoom before claiming current status.
- If making website changes, update this file when the project state meaningfully changes.
