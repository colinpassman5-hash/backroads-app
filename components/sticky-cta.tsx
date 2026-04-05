"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StickyCta() {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <Link
        href="/products"
        className="inline-flex h-14 min-w-14 items-center justify-center rounded-full border border-venom/70 bg-black/80 px-4 text-sm font-black uppercase tracking-[0.22em] text-venom shadow-[0_0_25px_rgba(124,255,0,0.24)] backdrop-blur"
      >
        Shop
      </Link>
    </motion.div>
  );
}
