import { NextRequest, NextResponse } from "next/server";
import { createContactInquiry } from "@/services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Get client IP and user agent
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create inquiry in Payload CMS
    await createContactInquiry({
      name,
      email,
      phone,
      message,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 },
    );
  }
}
