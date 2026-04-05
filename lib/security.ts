const DEFAULT_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

export function getAllowedOrigins() {
  const configured = process.env.ALLOWED_ORIGINS
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return Array.from(new Set([...(configured || []), ...(siteUrl ? [siteUrl] : []), ...DEFAULT_ALLOWED_ORIGINS]));
}

export function isAllowedOrigin(origin: string | null) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const requestUrl = new URL(origin);
    const requestHost = requestUrl.hostname.replace(/^www\./, "");

    return allowedOrigins.some((allowedOrigin) => {
      try {
        const allowedUrl = new URL(allowedOrigin);
        const allowedHost = allowedUrl.hostname.replace(/^www\./, "");

        return requestHost === allowedHost;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}
