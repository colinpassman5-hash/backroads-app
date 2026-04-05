"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui";

const features = [
  {
    title: "ONE-HANDED LOCK",
    body: "Grip, squeeze, and secure without breaking your rhythm."
  },
  {
    title: "NO SLIP. NO RESET.",
    body: "Aggressive hold strength keeps your setup where it belongs."
  },
  {
    title: "BUILT FOR SPEED",
    body: "Fast transitions for crews moving under pressure."
  },
  {
    title: "REPEATABLE EVERY TIME",
    body: "Consistent clamping feel from the first take to the last."
  }
];

export function FeaturesSection() {
  return (
    <section className="section-divider relative py-10 md:py-20">
      <SectionShell>
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow-font mb-4 text-xs text-venom/78">Why it converts</p>
          <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">Say less. Prove more.</h2>
        </div>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="industrial-panel flex min-h-[80vh] snap-center flex-col justify-center overflow-hidden rounded-[2rem] px-8 py-12 md:px-14"
            >
              <p className="eyebrow-font mb-4 text-xs font-semibold text-venom/75">
                Feature 0{index + 1}
              </p>
              <h3 className="display-font max-w-4xl text-4xl leading-none text-white sm:text-6xl md:text-[5.75rem]">
                {feature.title}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">{feature.body}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
