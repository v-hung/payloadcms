import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import z from "zod";
import { TranslateFn } from "@/types/next-intl";
import { $ZodIssue } from "zod/v4/core";

// Định nghĩa cấu trúc của hàm tạo schema: nhận t và trả về một ZodSchema
export type SchemaFactory<T> = (t: TranslateFn) => T;

/**
 * Dành cho Client Component
 */
export function useClientSchema<T extends z.ZodSchema>(
  createSchemaFn: (t: TranslateFn) => T,
): T {
  const t = useTranslations();
  return createSchemaFn(t);
}

/**
 * Dành cho Server Component / Action
 */
export async function getServerSchema<T extends z.ZodSchema>(
  createSchemaFn: (t: TranslateFn) => T,
): Promise<T> {
  const t = await getTranslations();
  return createSchemaFn(t);
}

/**
 * Utils bóc tách lỗi Zod thủ công (Hết lỗi Deprecated)
 */
export const formatZodIssues = (issues: $ZodIssue[]) => {
  return issues.reduce(
    (acc, issue) => {
      const path = issue.path[0] as string;
      if (path) {
        if (!acc[path]) acc[path] = [];
        acc[path].push(issue.message);
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );
};
