"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui";

const specs = [
  ["Overall width", "70-74 mm"],
  ["Overall height", "80-84 mm"],
  ["Overall depth", "36-40 mm"],
  ["Clamp range target", "12-38 mm"],
  ["Practical sweet spot", "15-35 mm"],
  ["Jaw face width", "~50 mm"],
  ["TPU pad thickness", "2-3 mm"],
  ["Finishes", "Matte Black, Matte White, Matte Tan"]
];

export function SpecsSection() {
  return (
    <section className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="eyebrow-font mb-4 text-xs text-venom/78">Prototype targets</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">Real numbers. Simple presentation.</h2>
            <p className="mt-5 max-w-md text-white/62">
              These are working prototype targets from the build packet, presented cleanly so we can swap in final
              production specs later without redesigning the page.
            </p>
          </div>
          <div className="industrial-panel overflow-hidden rounded-[2rem]">
            {specs.map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="flex items-center justify-between gap-6 border-b border-white/8 px-6 py-5 last:border-b-0"
              >
                <span className="text-white/58">{label}</span>
                <span className="text-right text-white">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
