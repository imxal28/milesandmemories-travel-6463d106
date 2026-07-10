import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const linkPattern = /(https?:\/\/|www\.|<a\s|\[url=|\bmarkdown:|\bhref=)/i;

const noLinks = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((v) => !linkPattern.test(v), { message: "Links are not allowed" });

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(3).max(40),
  destination: noLinks(200).min(1),
  travelDates: noLinks(200).min(1),
  travelType: z.string().trim().min(1).max(60),
  travelTypeOther: z.string().trim().max(120).optional().or(z.literal("")),
  persons: z.number().int().min(1).max(100),
  childrenAges: noLinks(200).optional().or(z.literal("")),
  budget: noLinks(200).min(1),
  notes: noLinks(2000).optional().or(z.literal("")),
  // Anti-spam
  company: z.string().max(0, { message: "Spam detected" }).optional().or(z.literal("")),
  renderedAt: z.number().int().positive(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => inquirySchema.parse(raw))
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
      travel_type_other: data.travelTypeOther || null,
      persons: data.persons,
      children_ages: data.childrenAges || null,
      budget: data.budget,
      notes: data.notes || null,
    });

    if (error) {
      console.error("Failed to insert inquiry:", error);
      throw new Error("We couldn't submit your enquiry. Please try again.");
    }

    return { ok: true as const };
  });
