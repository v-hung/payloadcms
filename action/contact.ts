"use server";

import { createContactInquiry } from "@/services";
import { headers } from "next/headers";
import {
  createContactFormSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { getServerSchema } from "@/lib/utils/validation";
import { safeAction } from "@/lib/server/action";

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export const submitContactForm = safeAction(async (data: ContactFormData) => {
  const contactFormSchema = await getServerSchema(createContactFormSchema);

  // Validate data với Zod schema
  const validatedData = contactFormSchema.parse(data);

  // Get client IP and user agent from headers
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  // Create inquiry in Payload CMS
  await createContactInquiry({
    ...validatedData,
    ipAddress,
    userAgent,
  });
});
