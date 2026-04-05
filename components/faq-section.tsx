"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionShell } from "@/components/ui";
import { faqs } from "@/lib/faqs";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow-font mb-4 text-xs text-venom/78">FAQ</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">Remove the hesitation.</h2>
            <p className="mt-5 max-w-md text-white/62">
              Strong launch pages do more than look premium. They also answer the objections that stop crews from
              signing up, asking for a quote, or placing an order.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="industrial-panel overflow-hidden rounded-[1.5rem]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-white">{item.question}</span>
                    <span className="text-2xl leading-none text-venom">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? <p className="px-6 pb-6 text-white/62">{item.answer}</p> : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
