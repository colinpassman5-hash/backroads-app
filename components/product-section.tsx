"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SectionShell } from "@/components/ui";

export function ProductSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.04, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const textY = useTransform(scrollYProgress, [0.1, 0.6], [50, -10]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.75], [0, 1, 1]);

  return (
    <section id="product" ref={ref} className="section-divider relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,255,0,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_50%)]" />
      <SectionShell>
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <motion.div style={{ scale: imageScale, y: imageY }} className="relative">
            <div className="industrial-panel mesh-panel relative overflow-hidden rounded-[2rem] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,255,0,0.2),transparent_30%,rgba(255,255,255,0.05)_70%,transparent)]" />
              <div className="chrome-grid absolute inset-0 opacity-[0.05]" />
              <div className="absolute left-[10%] top-[10%] h-12 w-[32%] rounded-full border border-venom/30 bg-venom/10 blur-sm" />
              <div className="absolute bottom-[8%] right-[8%] h-[30%] w-[32%] rounded-full border border-white/10 bg-white/5 blur-2xl" />
              <div className="relative rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="eyebrow-font text-[10px] text-venom/78">Approved reference geometry</p>
                    <p className="mt-2 text-sm text-white/70">Actual front / side / back reference for Quack Attack</p>
                  </div>
                  <div className="w-max rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/65">
                    Product reference asset
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
                  <Image
                    src="/products/quack-attack-views.png"
                    alt="Quack Attack front, side, and back reference views"
                    width={828}
                    height={255}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-5 grid gap-3 rounded-[1.25rem] border border-white/8 bg-black/25 p-4 text-sm text-white/55 sm:grid-cols-3">
                  <div>
                    <p className="eyebrow-font text-[10px] text-venom/75">Front</p>
                    <p className="mt-2">Sleek, camera-safe face with a premium, low-noise front profile.</p>
                  </div>
                  <div>
                    <p className="eyebrow-font text-[10px] text-venom/75">Side</p>
                    <p className="mt-2">Truthful mechanism read with clear squeeze direction and jaw travel.</p>
                  </div>
                  <div>
                    <p className="eyebrow-font text-[10px] text-venom/75">Back</p>
                    <p className="mt-2">Technical back with cheeseplate geometry, magnet plate, and release action.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
            <p className="eyebrow-font mb-4 text-xs font-semibold text-venom/80">Flagship product</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-5xl md:text-7xl">
              Quack Attack.
              <br />
              Built to clamp fast.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/68">
              A two-body squeeze-to-lock clamp built around a moving front jaw, fixed back body, steel pawl ratchet,
              centered magnet plate, and controlled surface-safe preload.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/4 p-4">
                <p className="eyebrow-font text-[10px] text-venom/78">Prototype objective</p>
                <p className="mt-2 text-white">Prove smooth close, clean release, safe grip, and trustworthy mounting.</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/4 p-4">
                <p className="eyebrow-font text-[10px] text-venom/78">Crew promise</p>
                <p className="mt-2 text-white">Fast. Clean. Surface-safe. Exact tension. Instant release.</p>
              </div>
            </div>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/55">
              <div className="flex items-center justify-between border-b border-white/8 py-3">
                <span>Product</span>
                <span className="text-white">Quack Attack</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/8 py-3">
                <span>Mechanism</span>
                <span className="max-w-[60%] text-right text-white">Manual squeeze-to-lock ratchet</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span>Mount concept</span>
                <span className="max-w-[60%] text-right text-white">Centered magnet plate + locating lip</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/8 py-3">
                <span>Clamp range</span>
                <span className="text-white">12-38 mm target</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span>Release strategy</span>
                <span className="text-white">Prototype validation + early access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>
    </section>
  );
}
