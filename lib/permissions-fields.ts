import type { Field } from "payload";
import {
  PERMISSION_ACTIONS,
  PERMISSION_COLLECTIONS,
} from "./permissions-config";

/**
 * Auto-generate permission fields for array items
 * Each item in the array represents one collection with its actions
 */
export const generatePermissionFields = (): Field[] => {
  return [
    {
      name: "collection",
      type: "select",
      required: true,
      label: { en: "Collection", vi: "Collection" },
      options: PERMISSION_COLLECTIONS.map((col) => ({
        label: col.labels,
        value: col.slug,
      })),
      admin: {
        width: "100%",
      },
    },
    {
      type: "row",
      fields: PERMISSION_ACTIONS.map((action) => ({
        name: action.slug,
        type: "checkbox",
        label: action.labels,
        defaultValue: false,
        admin: {
          width: "25%",
        },
      })),
    },
  ];
};
