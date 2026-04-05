import { NextResponse } from "next/server";

export const runtime = "nodejs";

function extractDriveHours(input: string) {
  const match = input.match(/(\d+)\s*\+?\s*hour/);
  if (!match) return 2;
  return Number.parseInt(match[1], 10);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: string;
      preferences?: string[];
      destination?: string;
    };

    const prompt = body.prompt?.trim() || "";
    const preferences = body.preferences?.slice(0, 8) || [];
    const hours = extractDriveHours(prompt);
    const destination = body.destination?.trim() || "Scenic route";

    const plan = {
      headline: `Backroads Plan for ${hours}+ hour adventure`,
      destination,
      tone: preferences.length ? preferences.join(", ") : "Nature, Overlooks",
      stops: [
        { name: "Sunrise pull-off", reason: "Quiet start with easy parking" },
        { name: "Local lake or river stop", reason: "Cooling break + photos" },
        { name: "Small-town lunch", reason: "Recharge without chain stops" },
        { name: "Golden-hour overlook", reason: "Finish with a strong view" }
      ]
    };

    return NextResponse.json({ ok: true, plan });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not generate trip plan." }, { status: 500 });
  }
}
