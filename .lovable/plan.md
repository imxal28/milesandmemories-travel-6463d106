## Goal

When someone submits the inquiry form:
1. Save to the `inquiries` table (already working — unchanged).
2. Email the full submission to **Milesandmemories@hotmail.com** via Resend.

No confirmation email to the submitter.

## Prerequisite you'll need to complete in Resend

Resend requires a **verified sender domain** to reliably deliver to Hotmail. Before/while I build this:

1. Sign up at resend.com (free tier is fine for your volume).
2. Add a domain you own (e.g. `milesandmemories.com`) in Resend → Domains and complete the DNS records they show.
3. Once it shows "Verified", tell me the sender address you want to use (e.g. `enquiries@milesandmemories.com`).

If you don't yet have a domain verified, the notification will still work while testing but only send to the Resend account owner's own email (Resend restriction on `onboarding@resend.dev`). Verifying your domain removes that limit and improves deliverability.

## Implementation

### 1. Connect Resend
- Link the Resend connector to the project. This exposes `RESEND_API_KEY` and `LOVABLE_API_KEY` to server code — no manual secret pasting.

### 2. Send from the existing server function
In `src/lib/inquiry.functions.ts`, after the successful `insert` into `inquiries`, add a call to the Resend gateway:

- Endpoint: `POST https://connector-gateway.lovable.dev/resend/emails`
- Headers: `Authorization: Bearer ${LOVABLE_API_KEY}`, `X-Connection-Api-Key: ${RESEND_API_KEY}`
- Body:
  - `from`: your verified sender (configurable — I'll put it in a constant at the top of the file so you can change it easily)
  - `to`: `["Milesandmemories@hotmail.com"]`
  - `reply_to`: the submitter's email (so you can reply directly from your inbox)
  - `subject`: `New enquiry — {name} — {destination}`
  - `html`: nicely formatted email with all fields: Name, Email, Phone, Destination, Travel dates (from → to), Travel type (+ "Other" text if given), Persons, Children ages, Per-night budget, Notes, plus submission timestamp.

### 3. Failure isolation
The email send is wrapped in try/catch and its errors are logged server-side but do **not** fail the request. The user still sees the "Thank you" screen and the record is still saved even if Resend has a transient issue. Failures are visible in server function logs.

### 4. No frontend changes
The form UI, validation, honeypot, and time-check stay exactly as they are.

## Files touched

- `src/lib/inquiry.functions.ts` — add Resend call after the successful insert.

No new files, no schema changes, no changes to the form, header, or any other page.

## What I need from you to finish

- Confirm the recipient is exactly **Milesandmemories@hotmail.com** (Hotmail, capital M).
- The verified sender address from Resend once your domain is verified. If you want, I can start with a placeholder `onboarding@resend.dev` (works only for your Resend account owner email during testing) and swap it to your branded sender the moment your domain verifies.
