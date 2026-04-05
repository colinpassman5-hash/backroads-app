"use client";

import { motion } from "framer-motion";
import { CobraLogo } from "@/components/cobra-logo";
import { GlowButton, SectionShell } from "@/components/ui";

export function HeroSection() {
  const proofItems = [
    { label: "Flagship", value: "Quack Attack" },
    { label: "Clamp range", value: "12-38 mm target" },
    { label: "Surface safety", value: "Broad TPU pad strategy" }
  ];

  return (
    <section className="noise-overlay relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,255,0,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%),linear-gradient(180deg,#0b0b0b,#050505)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-10%] bg-[radial-gradient(circle_at_center,rgba(124,255,0,0.14),transparent_36%)] opacity-80"
        animate={{ x: ["-2%", "2%", "-2%"], y: ["0%", "2%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-grid-fade bg-[size:58px_58px] opacity-[0.07]" />
      <SectionShell>
        <div className="relative z-10 grid min-h-screen items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-0">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex items-center gap-3"
            >
              <CobraLogo variant="icon" priority className="w-14 shrink-0 sm:w-16" />
              <div>
                <p className="display-font text-2xl italic leading-none text-white sm:text-3xl">
                  <span className="text-white">Cobra </span>
                  <span className="text-venom">Grip</span>
                </p>
                <p className="eyebrow-font mt-1 text-[9px] text-white/45 sm:text-[10px]">Grip that bites back</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              <span className="eyebrow-font text-[10px] font-semibold text-venom/85">Launch product</span>
              <span className="h-1 w-1 rounded-full bg-white/28" />
              <span className="text-xs uppercase tracking-[0.22em] text-white/60">Quack Attack prototype</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="display-font max-w-5xl text-5xl italic leading-[0.94] text-white sm:text-7xl md:text-[6.8rem]"
            >
              THE GRIP
              <br />
              THAT BITES
              <br />
              BACK
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg"
            >
              Locked-design prototype for fast, surface-safe edge mounting. One squeeze. Exact tension. Instant
              release.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <GlowButton>Get Early Access</GlowButton>
              <motion.a
                href="#product"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white"
              >
                See the system
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.5 }}
              className="mt-12 grid gap-4 md:max-w-2xl md:grid-cols-3"
            >
              {proofItems.map((item) => (
                <div key={item.label} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="eyebrow-font text-[10px] text-white/42">{item.label}</p>
                  <p className="display-font mt-3 text-[1.75rem] leading-none text-venom">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="absolute h-[22rem] w-[22rem] rounded-full bg-venom/10 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
            <div className="industrial-panel mesh-panel relative flex min-h-[28rem] w-full max-w-[30rem] items-center justify-center overflow-hidden rounded-[2rem] border-white/10 px-6 py-16 sm:min-h-[34rem] sm:max-w-[34rem] sm:rounded-[2.5rem]">
              <div className="absolute inset-4 rounded-[2rem] border border-white/8" />
              <div className="chrome-grid absolute inset-0 opacity-[0.06]" />
              <div className="absolute inset-x-[12%] top-[12%] h-10 rounded-full border border-venom/30 bg-venom/10 blur-sm" />
              <div className="absolute bottom-[12%] right-[12%] h-20 w-20 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute inset-x-4 top-4 flex flex-col gap-2 sm:inset-x-6 sm:top-6 sm:flex-row sm:items-start sm:justify-between">
                <span className="w-max rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">
                  Matte black / venom green
                </span>
                <span className="venom-ring w-max rounded-full border border-venom/20 bg-venom/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-venom/85">
                  Launch identity
                </span>
              </div>
              <div className="flex flex-col items-center gap-6 sm:gap-8">
                <CobraLogo variant="icon" priority className="w-[180px] sm:w-[260px]" />
                <div className="grid gap-3 text-center">
                  <p className="eyebrow-font text-xs text-venom/80">Mascot-led hardware brand system</p>
                  <p className="display-font text-2xl leading-none text-white sm:text-4xl">
                    Quack Attack.
                    <br />
                    First strike incoming.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>
    </section>
  );
}
