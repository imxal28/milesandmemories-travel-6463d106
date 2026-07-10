
## Goal
Save inquiries to the database and add lightweight spam protection to the form.

## Steps

1. **Enable Lovable Cloud** to provision the database and server runtime.

2. **Create `inquiries` table** (migration):
   - Columns: `id` (uuid, pk), `created_at`, `name`, `email`, `phone`, `destination`, `travel_dates`, `travel_type`, `travel_type_other`, `persons` (int), `children_ages`, `budget`, `notes`.
   - Length CHECK constraints as defense-in-depth.
   - Enable RLS.
   - Policies + grants:
     - `INSERT` policy `WITH CHECK (true)` for `anon` and `authenticated` (public form).
     - No SELECT policy for `anon`/`authenticated` — inquiries stay private.
     - `GRANT INSERT ON public.inquiries TO anon, authenticated;`
     - `GRANT ALL ON public.inquiries TO service_role;`

3. **Server function `submitInquiry`** (`src/lib/inquiry.functions.ts`):
   - Zod validation with strict field types and max lengths; email format check.
   - Spam protections (no rate limiting):
     - **Honeypot field** — a hidden `company` input; reject if non-empty.
     - **Time-to-submit check** — client sends a `renderedAt` timestamp; reject if submission happens in under ~3 seconds (bots auto-fill instantly) or after an unreasonably long time.
     - **Content heuristics** — reject if free-text fields contain URLs / `http(s)://` / BBCode-style link patterns (typical junk).
   - Insert row using the server publishable (anon) client so the RLS INSERT policy applies.

4. **Update `src/routes/inquiry.tsx`**:
   - Wire form to call `submitInquiry` via `useServerFn`.
   - Add the hidden honeypot input (visually hidden, `tabIndex={-1}`, `autoComplete="off"`).
   - Capture `renderedAt` on mount and send it with the payload.
   - Show inline error state on rejection; keep existing "Thank you" success screen.

## Notes
- Honeypot + time-check + link heuristic is the standard low-friction combo — no CAPTCHA required. If junk still gets through later, we can layer in Cloudflare Turnstile.
- No email notification is included. Say the word and I'll add an email-on-new-inquiry to your address using Lovable Emails (needs a verified sender domain).

Confirm and I'll implement.
