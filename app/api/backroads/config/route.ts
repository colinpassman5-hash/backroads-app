import { NextResponse } from "next/server";
import { hasSupabaseClientConfig } from "@/lib/supabase-client";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    useSupabaseAuth: hasSupabaseClientConfig()
  });
}
