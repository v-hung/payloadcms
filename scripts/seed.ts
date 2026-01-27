import type { Payload } from "payload";
import { ROLE_PERMISSIONS_CONFIG } from "../lib/permissions-config";

interface RoleSeed {
  slug: string;
  displayOrder: number;
  en: { name: string; description: string };
  vi: { name: string; description: string };
}

const ROLES_TO_SEED: RoleSeed[] = [
  {
    slug: "super-admin",
    displayOrder: 1,
    en: { name: "Super Admin", description: "Full system access" },
    vi: {
      name: "Quản trị viên tối cao",
      description: "Toàn quyền truy cập hệ thống",
    },
  },
  {
    slug: "admin",
    displayOrder: 2,
    en: { name: "Admin", description: "Administrator with most permissions" },
    vi: {
      name: "Quản trị viên",
      description: "Quản trị viên với hầu hết các quyền",
    },
  },
  {
    slug: "editor",
    displayOrder: 3,
    en: { name: "Editor", description: "Can create and edit content" },
    vi: {
      name: "Biên tập viên",
      description: "Có thể tạo và chỉnh sửa nội dung",
    },
  },
  {
    slug: "viewer",
    displayOrder: 4,
    en: { name: "Viewer", description: "Read-only access" },
    vi: { name: "Người xem", description: "Chỉ có quyền xem nội dung" },
  },
];

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info("--- Starting Seed Process ---");

  // 1. Handling Roles
  for (const roleData of ROLES_TO_SEED) {
    // Check if role already exists based on slug
    const existingRole = await payload.find({
      collection: "roles",
      where: { slug: { equals: roleData.slug } },
    });

    if (existingRole.docs.length === 0) {
      payload.logger.info(`Creating role: ${roleData.slug}...`);

      // Create English version (default)
      const newRole = await payload.create({
        collection: "roles",
        data: {
          slug: roleData.slug,
          name: roleData.en.name,
          description: roleData.en.description,
          isSystem: true,
          displayOrder: roleData.displayOrder,
          permissions:
            ROLE_PERMISSIONS_CONFIG[
              roleData.slug as keyof typeof ROLE_PERMISSIONS_CONFIG
            ],
        },
        locale: "en",
      });

      // Update Vietnamese version
      await payload.update({
        collection: "roles",
        id: newRole.id,
        data: {
          name: roleData.vi.name,
          description: roleData.vi.description,
        },
        locale: "vi",
      });
    } else {
      payload.logger.info(`Role ${roleData.slug} already exists, skipping.`);
    }
  }

  // 2. Handling Admin User
  const adminEmail = "admin@admin.com";
  const existingAdmin = await payload.find({
    collection: "admins",
    where: { email: { equals: adminEmail } },
  });

  if (existingAdmin.docs.length === 0) {
    payload.logger.info("Creating super admin user...");

    // Get ID of the super-admin role created/checked above
    const { docs: roles } = await payload.find({
      collection: "roles",
      where: { slug: { equals: "super-admin" } },
    });

    await payload.create({
      collection: "admins",
      data: {
        email: adminEmail,
        password: "Admin@123",
        name: "Super Administrator",
        status: "active",
        role: roles[0].id,
      },
    });
    payload.logger.info("✓ Admin user created successfully");
  } else {
    payload.logger.info("Admin user already exists, skipping.");
  }

  payload.logger.info("--- Seeding Completed ---");
};
