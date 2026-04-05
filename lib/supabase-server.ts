const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  "";

function authHeaders(apiKey: string) {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "content-type": "application/json"
  };
}

export function hasSupabaseServerConfig() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function hasSupabasePublishableConfig() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export async function insertTripToSupabase(input: {
  accountEmail: string;
  origin: string;
  destination: string;
  savedAt: string;
}) {
  if (!hasSupabaseServerConfig()) {
    return { ok: false as const, error: "Supabase database is not configured." };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/backroads_trips`, {
    method: "POST",
    headers: {
      ...authHeaders(supabaseServiceRoleKey),
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      account_email: input.accountEmail,
      origin: input.origin,
      destination: input.destination,
      saved_at: input.savedAt
    })
  });

  if (!response.ok) {
    const message = await response.text();
    return { ok: false as const, error: message || "Could not save your trip." };
  }

  return { ok: true as const };
}
