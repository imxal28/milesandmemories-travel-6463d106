import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const linkPattern = /(https?:\/\/|www\.|<a\s|\[url=|\bhref=)/i;

const noLinks = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((v) => !linkPattern.test(v), { message: "Links are not allowed" });

const optionalNoLinks = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((v) => !linkPattern.test(v), { message: "Links are not allowed" })
    .optional();

const isoDate = (msg: string) =>
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, msg);

const inquirySchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name.").max(200),
    email: z.string().trim().email("Please enter a valid email address.").max(320),
    phone: z.string().trim().min(3, "Please enter your phone number.").max(40),
    destination: noLinks(1, 200),
    travelDatesFrom: isoDate("Please select a departure date."),
    travelDatesTo: isoDate("Please select a return date."),
    travelDates: z.string().trim().min(1).max(200),
    travelType: z.string().trim().min(1, "Please select the kind of travel.").max(60),
    travelTypeOther: z.string().trim().max(120).optional(),
    persons: z.coerce
      .number({ invalid_type_error: "Please enter the number of travellers." })
      .int("Please enter a whole number of travellers.")
      .min(1, "Please enter at least 1 traveller.")
      .max(100),
    childrenAges: optionalNoLinks(200),
    budget: noLinks(1, 200),
    notes: optionalNoLinks(2000),
    // Anti-spam
    company: z.string().max(0).optional(),
    renderedAt: z.number().int().positive(),
  })
  .refine((v) => v.travelDatesTo >= v.travelDatesFrom, {
    path: ["travelDatesTo"],
    message: "Return date must be on or after the departure date.",
  });


type InquiryInput = z.infer<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown): InquiryInput => {
    const result = inquirySchema.safeParse(raw);
    if (!result.success) {
      const first = result.error.issues[0];
      throw new Error(first?.message ?? "Please check the form and try again.");
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    // Honeypot
    if (data.company && data.company.length > 0) {
      throw new Error("Submission rejected.");
    }
    // Time-to-submit: reject if under 3s or absurdly long (>6h)
    const elapsed = Date.now() - data.renderedAt;
    if (elapsed < 3000 || elapsed > 1000 * 60 * 60 * 6) {
      throw new Error("Submission rejected.");
    }

    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      },
    );

    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      travel_dates: data.travelDates,
      travel_type: data.travelType,
      travel_type_other: data.travelTypeOther ? data.travelTypeOther : null,
      persons: data.persons,
      children_ages: data.childrenAges ? data.childrenAges : null,
      budget: data.budget,
      notes: data.notes ? data.notes : null,
    });

    if (error) {
      console.error("Failed to insert inquiry:", error);
      throw new Error("We couldn't submit your enquiry. Please try again.");
    }

    return { ok: true as const };
  });
