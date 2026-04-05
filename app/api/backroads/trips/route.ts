import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/waitlist";
import { saveBackroadsTrip } from "@/lib/backroads-store";
import { hasSupabaseServerConfig, insertTripToSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Invalid request type." }, { status: 415 });
    }

    const limit = rateLimit(`backroads:trip:${ip}`);

    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait and try again." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      accountEmail?: string;
      origin?: string;
      destination?: string;
      preferences?: string[];
      wanderMode?: boolean;
      scenicStop?: string;
    };

    const accountEmail = body.accountEmail?.trim().toLowerCase() || "";
    const origin = body.origin?.trim() || "Current location";
    const destination = body.destination?.trim() || "";

    if (!accountEmail || !isValidEmail(accountEmail)) {
      return NextResponse.json({ ok: false, error: "A valid account is required." }, { status: 400 });
    }

    if (!destination || destination.length > 220) {
      return NextResponse.json({ ok: false, error: "Please enter a valid destination." }, { status: 400 });
    }

    const payload = {
      accountEmail,
      origin: origin.slice(0, 120),
      destination: destination.slice(0, 220),
      preferences: Array.isArray(body.preferences) ? body.preferences.slice(0, 12) : [],
      wanderMode: Boolean(body.wanderMode),
      scenicStop: body.scenicStop?.trim()?.slice(0, 80) || "",
      savedAt: new Date().toISOString()
    };

    if (hasSupabaseServerConfig()) {
      const result = await insertTripToSupabase(payload);
      if (!result.ok) {
        return NextResponse.json({ ok: false, error: "Unable to save trip to Supabase." }, { status: 500 });
      }
    } else {
      await saveBackroadsTrip(payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
