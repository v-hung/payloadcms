"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { submitContactForm } from "@/action/contact";
import {
  createContactFormSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { useClientSchema } from "@/lib/utils/validation";

export function ContactForm() {
  const t = useTranslations();

  // Create localized schema using validation utils
  const contactFormSchema = useClientSchema(createContactFormSchema);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    const result = await submitContactForm(data);

    if (result.success) {
      toast.success(t("Pages.Contact.successMessage"));
      form.reset();
    } else {
      toast.error(result.error || t("Pages.Contact.errorMessage"));
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("Pages.Contact.title")}</CardTitle>
        <CardDescription>{t("Pages.Contact.getInTouch")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name Field */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-name">
                    {t("Pages.Contact.name")}{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("Pages.Contact.namePlaceholder")}
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-email">
                    {t("Pages.Contact.email")}{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("Pages.Contact.emailPlaceholder")}
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone Field */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-phone">
                    {t("Pages.Contact.phone")}{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("Pages.Contact.phonePlaceholder")}
                    autoComplete="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Message Field */}
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-message">
                    {t("Pages.Contact.message")}{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="contact-form-message"
                      placeholder={t("Pages.Contact.messagePlaceholder")}
                      rows={6}
                      className="min-h-32 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {t("Pages.Contact.characterCount", {
                          count: field.value.length,
                        })}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={form.formState.isSubmitting}
          >
            {t("Actions.cancel")}
          </Button>
          <Button
            type="submit"
            form="contact-form"
            disabled={form.formState.isSubmitting}
            className="flex-1"
          >
            {form.formState.isSubmitting
              ? t("Actions.sending")
              : t("Actions.sendMessage")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
