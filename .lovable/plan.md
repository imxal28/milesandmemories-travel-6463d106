## Goal

Replace the free-text `travelDates` field on `/inquiry` with a proper date-range picker (from + to), styled to match the rest of the form exactly, and switch validation + storage to standardized ISO date strings.

## UI change (`src/routes/inquiry.tsx`)

- Replace the single `travelDates` text input with two shadcn `Popover` + `Calendar` triggers side-by-side: **From** and **To**.
- Trigger is a `<button type="button">` styled with the **exact same classes** as the other form inputs (`w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors`), left-aligned text, with a small calendar icon on the right. Placeholder text ("Select date") uses the same muted color when empty.
- Popover content uses `Calendar` with `mode="single"`, `className="p-3 pointer-events-auto"`, `bg-background` panel.
- `To` calendar has `disabled={{ before: fromDate }}`; if user picks a `from` after existing `to`, clear `to`.
- Keep the existing `Field` wrapper and the same label ("Dates of travel — from and to *"), so spacing and typography are identical to sibling fields.
- Store both dates in component state as `Date | undefined`. On submit, format as `yyyy-MM-dd` with `date-fns` (already in the project) and send:
  - `travelDatesFrom: "2026-10-12"`
  - `travelDatesTo: "2026-10-24"`
  - keep sending a human `travelDates` string (`"2026-10-12 to 2026-10-24"`) for backward compatibility / display.
- Client validation: if either date missing → `"Please select your travel dates."`; if `to < from` → `"Return date must be after the departure date."`.

## Server change (`src/lib/inquiry.functions.ts`)

- Add two fields to the Zod schema:
  - `travelDatesFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a departure date.")`
  - `travelDatesTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a return date.")`
  - cross-field refine: `to >= from` → `"Return date must be after the departure date."`
- Keep `travelDates` string (loosened to any non-empty short string) for the existing DB column.
- Insert: continue writing the combined string into the existing `travel_dates` column so no DB migration is required. (Optional: mention that if the user later wants separate columns we can add a migration.)

## Files touched

- `src/routes/inquiry.tsx` — swap input for date-range picker, update submit payload + validation messages.
- `src/lib/inquiry.functions.ts` — extend schema with ISO date fields, cross-field check, keep DB write shape.

No changes to layout, colors, typography, other fields, DB schema, or RLS.

## Verification

- Empty dates → inline "Please select your travel dates.", no server call.
- `to` before `from` → inline error, no server call.
- Valid range → row saves to `inquiries.travel_dates` as `"YYYY-MM-DD to YYYY-MM-DD"`, success screen renders.
- Picker visually matches the other inputs (same underline border, focus color, font, spacing).
