"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui";

const cases = [
  {
    title: "Fast Reset Days",
    body: "The brief is built around frictionless setup: squeeze, mount, and move without fighting a bulky clamp.",
    stat: "Fast"
  },
  {
    title: "Surface-Safe Mounting",
    body: "Broad TPU pads are part of the product differentiation, aiming to feel safer on common surfaces than heavier hardware.",
    stat: "Surface-safe"
  },
  {
    title: "Everyday Edge Work",
    body: "Quack Attack is positioned for the everyday edge-mounting problem rather than the oversized heavy-duty job.",
    stat: "Exact tension"
  }
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow-font mb-4 text-xs text-venom/78">Why crews want it</p>
          <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">
            Designed for real grip and electric workflow.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/62">
            Cobra Grip is positioned for operators, gaffers, key grips, and owner-operators who care about speed,
            consistency, and confidence under pressure.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="industrial-panel rounded-[1.8rem] p-7"
            >
              <p className="eyebrow-font text-xs text-venom/72">{item.stat}</p>
              <h3 className="display-font mt-4 text-3xl leading-none text-white">{item.title}</h3>
              <p className="mt-4 text-white/62">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
