## Diagnosis

The enquiry form submits via native `FormData` but two fields fail server-side Zod validation with an unfriendly error:

1. **`persons`** — the number input is empty by default. `Number(form.get("persons") ?? 0)` becomes `0` (or `NaN` if the value is `""`), which fails `z.number().int().min(1)`. There is no client-side check before the payload is sent.
2. **`travelDates`** — it's a free-text input (no date picker in the current UI). If left blank it fails `min(1)` on the server. There is no `required`-style guard client-side beyond the browser's default (which server validation bypasses via `noValidate`).
3. **Error surfacing** — when Zod throws inside `.inputValidator()`, the message reaches the client as a raw `ZodError` JSON string. The UI shows that whole blob instead of a friendly per-field message.

Field names between form → payload → Zod schema → Supabase columns are already consistent (`travelDates` ↔ `travel_dates`, `travelTypeOther` ↔ `travel_type_other`, `childrenAges` ↔ `children_ages`). No rename needed.

## Fix (no UI/design changes)

### `src/routes/inquiry.tsx`
- Add lightweight client-side guards before calling the server fn:
  - Trim and require `travelDates`; show inline message "Please enter your travel dates" if empty.
  - Parse `persons` with `Number(...)`; if `NaN` or `< 1`, show "Please enter at least 1 traveller".
  - Keep existing `travelType` guard.
- Keep the existing native inputs, classes, spacing, and copy exactly as-is — only wire validation state into the same `errorMsg` slot already in the layout.
- Map known server error shapes (Zod issues) into a single friendly sentence instead of dumping the raw error.

### `src/lib/inquiry.functions.ts`
- Keep schema field names identical. Adjust two things only:
  - Coerce `persons` with `z.coerce.number().int().min(1).max(100)` as defence-in-depth (so a stringified number never trips validation).
  - Attach clear `message` strings to each rule (email, travelDates, persons, budget) so any rare server-surfaced error is human-readable.
- Wrap `inquirySchema.parse(...)` in `safeParse` inside the validator and throw a single friendly `Error` built from the first issue (e.g. `"Please enter your travel dates."`). This is what the client will display.

### Not changing
- No changes to `src/routes/inquiry.tsx` layout, class names, headings, spacing, honeypot, or timing check.
- No changes to the `inquiries` table, RLS policy, grants, or Supabase types.
- No email-notification code is added (none exists yet); if you want that, say the word and I'll wire Lovable Emails in a separate step.

## Verification
- Submit with `persons` empty → inline "Please enter at least 1 traveller", no server call.
- Submit with `travelDates` empty → inline "Please enter your travel dates", no server call.
- Submit valid payload → row appears in the `inquiries` table, success screen renders.
- Trigger the honeypot / <3s guard → friendly rejection, no crash.
