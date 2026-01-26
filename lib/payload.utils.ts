import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Get configured Payload instance
 * Use this for all database queries
 */
export async function getPayloadClient() {
  return await getPayload({ config });
}
