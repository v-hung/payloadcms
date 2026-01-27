// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { getPayload } from "payload";
import configPromise from "@payload-config";

async function runSeed() {
  console.log("🌱 Starting seed process...");

  try {
    const payload = await getPayload({
      config: configPromise,
    });

    // Import và chạy seed function
    const { seed } = await import("./seed");
    await seed(payload);

    console.log("✅ Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

runSeed();
