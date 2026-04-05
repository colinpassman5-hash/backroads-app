import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://backroads-gps-app.vercel.app"),
  title: "Backroads",
  description: "Adventure-first road trip planning and social drive sharing.",
  keywords: ["road trip planner", "scenic drives", "social drive sharing", "backroads"],
  openGraph: {
    title: "Backroads",
    description: "Adventure-first road trip planning and social drive sharing.",
    url: "https://backroads-gps-app.vercel.app",
    siteName: "Backroads",
    type: "website"
  },
  alternates: {
    canonical: "https://backroads-gps-app.vercel.app"
  },
  category: "travel",
  applicationName: "Backroads"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
