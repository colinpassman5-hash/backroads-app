import { NextResponse } from "next/server";
import { addCommunityComment } from "@/lib/backroads-community";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      postId?: string;
      author?: string;
      body?: string;
    };

    const postId = body.postId?.trim() || "";
    const author = body.author?.trim() || "Backroads Friend";
    const commentBody = body.body?.trim() || "";

    if (!postId || !commentBody) {
      return NextResponse.json({ ok: false, error: "Missing comment details." }, { status: 400 });
    }

    const comment = await addCommunityComment({
      postId,
      author,
      body: commentBody.slice(0, 220)
    });

    return NextResponse.json({ ok: true, comment });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not add comment." }, { status: 500 });
  }
}
