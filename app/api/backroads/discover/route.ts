import { NextResponse } from "next/server";

export const runtime = "nodejs";

const catalog = {
  campsites: [
    { name: "Ridge Pine Camp", etaMinutes: 36, note: "Forest shade, creek nearby" },
    { name: "Lakebend Campground", etaMinutes: 52, note: "Water views and picnic tables" }
  ],
  gas: [
    { name: "Trailhead Fuel", etaMinutes: 18, note: "Open late, clean restrooms" },
    { name: "Summit Station", etaMinutes: 29, note: "Quick in and out" }
  ],
  coffee: [
    { name: "Roam Roast", etaMinutes: 14, note: "Drive-thru + pastries" },
    { name: "Backcountry Brews", etaMinutes: 27, note: "Local beans, fast stop" }
  ],
  icecream: [
    { name: "Old Mill Scoops", etaMinutes: 34, note: "Small-batch waffle cones" },
    { name: "Cedar Creamery", etaMinutes: 41, note: "Outdoor seating and lake view" }
  ]
};

export async function POST() {
  return NextResponse.json({ ok: true, ...catalog });
}
