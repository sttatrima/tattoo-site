/**
 * Booking API Route
 * Handles contact/booking form submissions for tattoo enquiries
 * Aligned with Adara Tattoo Collective contact form pattern
 */

import { NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  enquiryType: z.enum(["tattoo", "piercing", "general"]),
  artist: z.string().optional(),
  placement: z.string().min(1, "Placement is required"),
  size: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().min(10, "Please describe your idea in more detail"),
  referenceImages: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = bookingSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, enquiryType, artist, placement, size, budget, description, referenceImages } = validated.data;

    // In production, this would send an email via Resend/SendGrid/Shopify contact form
    // For now, we log and return success
    const bookingReference = `INK-${Date.now().toString(36).toUpperCase()}`;

    console.log("Booking enquiry received:", {
      reference: bookingReference,
      name,
      email,
      phone,
      enquiryType,
      artist,
      placement,
      size,
      budget,
      description,
      referenceImages: referenceImages || [],
    });

    return NextResponse.json(
      {
        success: true,
        reference: bookingReference,
        message: "Thank you for your enquiry. We'll get back to you within 24-48 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
