## Goal

On the `/inquiry` form, block submission when any required field is empty/whitespace and show an on-brand toast (via `sonner`) naming the specific missing field — no native `alert()`, no backend call, no state mutation until valid.

## Scope

Single file: `src/routes/inquiry.tsx`. No design/layout changes. No server or schema changes.

## Required fields (per current form)

Email, Phone number, Name, Destination, Travel dates (from + to), Travel type (+ "Other" description if selected), Persons, Budget.
Optional: Children's ages, Notes.

## Changes in `src/routes/inquiry.tsx`

1. Import `toast` from `sonner`. Confirm `<Toaster />` is mounted at root (it's part of the template); if missing, add `<Toaster />` inside this page as a fallback so notifications render.
2. Add `noValidate` (already present) and remove reliance on browser `required` popups for messaging.
3. In `handleSubmit`, before any server call, run an ordered validation pass:
   - Trim each text field read from `FormData`.
   - For each required field, if empty → `toast.error("Please enter your <field label>.")`, focus that input via a ref or `document.getElementsByName(...)[0].focus()`, and `return`.
   - Travel dates: if `dateFrom` or `dateTo` missing → `toast.error("Please select your travel dates.")`; if `dateTo < dateFrom` → `toast.error("Return date must be on or after the departure date.")`.
   - Travel type: if none selected → `toast.error("Please choose the kind of travel you're planning.")`. If "Other" selected and `otherTravelType` blank → `toast.error("Please describe your travel type.")`.
   - Persons: parse number, if `<1` or not finite → `toast.error("Please enter at least 1 traveller.")`.
4. Replace the existing inline `errorMsg` UX with toasts. Keep `errorMsg` only for server errors returned by `submitInquiry` (still toasted, but also stays inline as today for accessibility).
5. Field labels used in toast messages mirror the visible form labels (e.g., "Please enter your email.", "Please tell us which destination you're considering.").
6. Styling: `sonner` already inherits the site's `--background`, `--foreground`, `--border`, and font tokens from `src/styles.css`; pass `richColors` off, use default variant so it matches the muted cream/terracotta palette. No new CSS.

## Non-goals

- No changes to Zod schema, server function, DB, RLS, or spam checks.
- No layout, spacing, color, or typography edits.
- No modal component — a toast satisfies the "custom in-style alert" requirement and is already used elsewhere in shadcn projects.

## Verification

- Submit empty form → toast "Please enter your email."; focus jumps to email; no network call.
- Fill email only → next toast names the next missing field, in order.
- Select "Other" travel type but leave text blank → toast "Please describe your travel type."
- Pick return date before departure → toast about date order.
- Fill everything correctly → submission proceeds and success screen renders as today.
