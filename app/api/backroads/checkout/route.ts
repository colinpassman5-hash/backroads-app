import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getBackroadsCheckoutUrl() {
  const directUrl = process.env.BACKROADS_STRIPE_PAYMENT_LINK_URL?.trim();

  if (directUrl) {
    return directUrl;
  }

  return "/checkout";
}

export async function POST() {
  try {
    return NextResponse.json({
      ok: true,
      checkoutUrl: getBackroadsCheckoutUrl()
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to start checkout right now." },
      { status: 500 }
    );
  }
}
