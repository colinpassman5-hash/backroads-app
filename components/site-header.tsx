"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CartButton } from "@/components/cart-button";
import { CobraLogo } from "@/components/cobra-logo";
import { GlowButton, SectionShell } from "@/components/ui";

const navItems = [
  { href: "/products", label: "Products" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/#faq", label: "FAQ" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-black/65 px-4 py-2.5 shadow-[0_14px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <CobraLogo variant="icon" className="w-12 shrink-0 sm:w-14" />
            <div className="min-w-0">
              <p className="display-font truncate text-xl italic leading-none text-white sm:text-2xl">
                <span className="text-white">Cobra </span>
                <span className="text-venom">Grip</span>
              </p>
              <p className="eyebrow-font mt-1 truncate text-[9px] text-white/48 sm:text-[10px]">
                Grip and electric hardware
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.2em] text-white/62 transition hover:text-venom"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <CartButton />
            <GlowButton className="inline-flex min-w-[196px]">Get Early Access</GlowButton>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.22em] text-white"
              aria-expanded={menuOpen}
            >
              Menu
            </button>
          </div>
        </motion.div>
        {menuOpen ? (
          <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-black/70 p-4 backdrop-blur-xl md:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/72"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-venom/70 bg-venom px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.22em] text-black"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        ) : null}
      </SectionShell>
    </header>
  );
}
