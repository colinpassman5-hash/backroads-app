import { NextResponse } from "next/server";
import { addCommunityPost, listCommunityPosts } from "@/lib/backroads-community";

export const runtime = "nodejs";

function obfuscatePlace(input: string) {
  const parts = input.split(",").map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return "Unknown area";
  return `${parts[0]} area`;
}

export async function GET() {
  try {
    const posts = await listCommunityPosts();
    return NextResponse.json({ ok: true, posts });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not load community feed." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      author?: string;
      origin?: string;
      destination?: string;
      vibe?: string[];
      summary?: string;
    };

    const safetyRadiusMiles = Math.floor(Math.random() * 6) + 5;
    const post = await addCommunityPost({
      author: body.author?.trim() || "Backroads Driver",
      title: "Shared drive",
      summary: body.summary?.trim() || "Great road with scenic pull-offs.",
      vibe: body.vibe?.slice(0, 8) || [],
      obfuscatedStart: obfuscatePlace(body.origin?.trim() || "Origin"),
      obfuscatedEnd: obfuscatePlace(body.destination?.trim() || "Destination"),
      safetyRadiusMiles
    });

    return NextResponse.json({ ok: true, post });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not share drive." }, { status: 500 });
  }
}
