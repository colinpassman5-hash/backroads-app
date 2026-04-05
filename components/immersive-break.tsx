"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui";

export function ImmersiveBreak() {
  return (
    <section className="section-divider relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,255,0,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <SectionShell>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="industrial-panel relative flex min-h-[88vh] items-center justify-center overflow-hidden rounded-[2.5rem] px-6 py-16 text-center"
        >
          <div className="absolute inset-0 animate-shake opacity-50">
            <div className="absolute left-[14%] top-[18%] h-28 w-28 rounded-full bg-venom/10 blur-3xl" />
            <div className="absolute bottom-[14%] right-[12%] h-32 w-32 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="display-font text-5xl leading-none text-white sm:text-7xl md:text-[7rem]">
              This isn&apos;t a clamp.
            </p>
            <p className="display-font mt-4 text-5xl leading-none text-venom sm:text-7xl md:text-[7rem]">
              It&apos;s a strike.
            </p>
          </div>
        </motion.div>
      </SectionShell>
    </section>
  );
}
