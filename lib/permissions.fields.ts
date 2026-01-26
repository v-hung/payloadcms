import type { Field } from "payload";
import {
  PERMISSION_ACTIONS,
  PERMISSION_COLLECTIONS,
} from "./permissions.config";

/**
 * Auto-generate permission fields from config
 * No need to edit this file when adding new collections!
 */
export const generatePermissionFields = (): Field[] => {
  return PERMISSION_COLLECTIONS.map((collection) => ({
    type: "collapsible",
    label: collection.labels,
    admin: {
      initCollapsed: false,
    },
    fields: [
      {
        name: collection.slug,
        type: "group",
        label: false, // Hide group label because collapsible already has a label
        admin: {
          hideGutter: true,
        },
        fields: [
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
        ],
      },
    ],
  }));
};
