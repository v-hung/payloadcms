import { getPayloadClient } from "@/lib/payload.utils";

/**
 * Submit contact inquiry form
 * Used in contact page
 */
export async function createContactInquiry(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const payload = await getPayloadClient();

  const result = await payload.create({
    collection: "contact-inquiries",
    data: {
      ...data,
      status: "new",
      submittedAt: new Date().toISOString(),
    },
  });

  return result;
}
