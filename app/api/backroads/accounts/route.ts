import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { saveBackroadsAccount, validateAccountPayload } from "@/lib/backroads-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Invalid request type." }, { status: 415 });
    }

    const limit = rateLimit(`backroads:account:${ip}`);

    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait and try again." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as { name?: string; email?: string };
    const payload = validateAccountPayload(body.name || "", body.email || "");

    if (!payload.valid) {
      return NextResponse.json({ ok: false, error: payload.error }, { status: 400 });
    }

    const result = await saveBackroadsAccount(payload.name, payload.email);

    return NextResponse.json({ ok: true, created: result.created });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
