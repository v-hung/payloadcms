import "server-only";

import { ZodError } from "zod";
import { formatZodIssues } from "../utils/validation";
import { getTranslations } from "next-intl/server";

export type ActionState<T> =
  | ({ success: true } & (T extends void ? object : { data: T }))
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export function safeAction<TArgs extends readonly unknown[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<ActionState<TResult>> {
  return async (...args: TArgs): Promise<ActionState<TResult>> => {
    const t = await getTranslations();
    try {
      const result = await handler(...args);

      return {
        success: true,
        ...(result === undefined ? {} : { data: result }),
      } as ActionState<TResult>;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = formatZodIssues(error.issues);

        return {
          success: false,
          error: t("Common.validationFailed"),
          fieldErrors,
        };
      }

      console.error("Action error:", error);
      return { success: false, error: t("Common.internalServerError") };
    }
  };
}
