const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey =
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

export function hasSupabaseClientConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseOAuthUrl(provider: "google" | "apple", redirectTo: string) {
  if (!hasSupabaseClientConfig()) {
    return "";
  }

  const params = new URLSearchParams({
    provider,
    redirect_to: redirectTo
  });

  return `${supabaseUrl}/auth/v1/authorize?${params.toString()}`;
}

export async function signUpWithSupabase(email: string, password: string) {
  if (!hasSupabaseClientConfig()) {
    return { ok: false as const, error: "Supabase auth is not configured." };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: authHeaders(supabaseAnonKey),
    body: JSON.stringify({ email, password })
  });

  const payload = (await response.json()) as { error_description?: string; msg?: string };

  if (!response.ok) {
    return {
      ok: false as const,
      error: payload.error_description || payload.msg || "Could not create your account."
    };
  }

  return { ok: true as const };
}
