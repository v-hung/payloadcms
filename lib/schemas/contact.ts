import { TranslateFn } from "@/types/next-intl";
import { z } from "zod";

export const createContactFormSchema = (t: TranslateFn) =>
  z.object({
    name: z
      .string()
      .min(1, t("Validation.required", { field: t("Fields.name") }))
      .min(2, t("Validation.minLength", { field: t("Fields.name"), count: 2 }))
      .max(
        100,
        t("Validation.maxLength", { field: t("Fields.name"), count: 100 }),
      )
      .trim(),
    email: z
      .email(t("Validation.invalidEmail"))
      .max(
        100,
        t("Validation.maxLength", { field: t("Fields.email"), count: 100 }),
      )
      .trim(),
    phone: z
      .string()
      .min(1, t("Validation.required", { field: t("Fields.phone") }))
      .min(
        10,
        t("Validation.minLength", { field: t("Fields.phone"), count: 10 }),
      )
      .max(
        20,
        t("Validation.maxLength", { field: t("Fields.phone"), count: 20 }),
      )
      .trim(),
    message: z
      .string()
      .min(1, t("Validation.required", { field: t("Fields.message") }))
      .min(
        10,
        t("Validation.minLength", { field: t("Fields.message"), count: 10 }),
      )
      .max(
        1000,
        t("Validation.maxLength", { field: t("Fields.message"), count: 1000 }),
      )
      .trim(),
  });

export type ContactFormData = z.infer<
  ReturnType<typeof createContactFormSchema>
>;
