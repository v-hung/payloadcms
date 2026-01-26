import type { Access, PayloadRequest, TypedUser } from "payload";
import {
  ROLE_PERMISSIONS_CONFIG,
  RoleName,
  type PermissionAction,
  type PermissionCollection,
} from "./permissions.config";

/**
 * Check if user has permission for a specific action on a collection
 * Role data is already populated from defaultPopulate - no need to query the database.
 */
export const hasPermission = (
  user: TypedUser | null,
  collection: PermissionCollection,
  action: PermissionAction,
): boolean => {
  if (!user) return false;

  // Check if user is active
  if (user.status !== "active") return false;

  // Get populated role (from defaultPopulate)
  const role = typeof user.role === "object" ? user.role : null;
  if (!role) return false;

  // Super admin always has full permissions
  if (role.slug === "super-admin") return true;

  // Check permissions directly from role
  if (role.permissions?.[collection]?.[action]) {
    return role.permissions[collection][action];
  }

  // Fallback to default config if permissions are not set
  const rolePermissions = ROLE_PERMISSIONS_CONFIG[role.slug as RoleName];
  if (rolePermissions?.[collection]?.[action]) {
    return rolePermissions[collection][action];
  }

  return false;
};

/**
 * Create access control function for a collection
 * Permissions are checked from populated role data - synchronous, no DB queries
 */
export const createCollectionAccess = (
  collection: PermissionCollection,
): {
  create: Access;
  read: Access;
  update: Access;
  delete: Access;
} => ({
  create: ({ req }: { req: PayloadRequest }) => {
    return hasPermission(req.user, collection, "create");
  },

  read: ({ req }: { req: PayloadRequest }) => {
    return hasPermission(req.user, collection, "view");
  },

  update: ({ req }: { req: PayloadRequest }) => {
    return hasPermission(req.user, collection, "update");
  },

  delete: ({ req }: { req: PayloadRequest }) => {
    return hasPermission(req.user, collection, "delete");
  },
});
