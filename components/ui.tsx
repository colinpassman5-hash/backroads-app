"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function SectionShell({ children }: PropsWithChildren) {
  return <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10">{children}</section>;
}

export function GlowButton({
  children,
  href = "#signup",
  className = ""
}: PropsWithChildren<{ href?: string; className?: string }>) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black shadow-venom transition hover:shadow-[0_0_32px_rgba(124,255,0,0.45)] ${className}`}
    >
      <span className="animate-glow rounded-full">{children}</span>
    </motion.a>
  );
}
