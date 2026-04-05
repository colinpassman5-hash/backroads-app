import { NextResponse } from "next/server";
import { getBackroadsTripsByEmail } from "@/lib/backroads-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email")?.trim().toLowerCase() || "";

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
    }

    const trips = await getBackroadsTripsByEmail(email);
    const currentYear = new Date().getUTCFullYear();
    const thisYearTrips = trips.filter(
      (trip) => new Date(trip.savedAt).getUTCFullYear() === currentYear
    );

    const totalTrips = thisYearTrips.length;
    const totalMiles = thisYearTrips.reduce(
      (sum, trip) => sum + (typeof trip.distanceMiles === "number" ? trip.distanceMiles : 0),
      0
    );
    const topVibes = thisYearTrips
      .flatMap((trip) => trip.preferences || [])
      .reduce<Record<string, number>>((acc, vibe) => {
        acc[vibe] = (acc[vibe] || 0) + 1;
        return acc;
      }, {});

    return NextResponse.json({
      ok: true,
      recap: {
        year: currentYear,
        totalTrips,
        totalMiles,
        topVibes: Object.entries(topVibes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }))
      }
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not load yearly recap." }, { status: 500 });
  }
}
