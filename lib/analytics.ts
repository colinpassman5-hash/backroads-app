export function getAnalyticsConfig() {
  return {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""
  };
}
