"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui";

const testimonials = [
  {
    quote: "Finally feels like a grip tool designed by people who actually move fast on set.",
    name: "Sam R.",
    role: "Commercial DP"
  },
  {
    quote: "The lock action is brutal in the best way. Fast, confident, repeatable.",
    name: "Nina T.",
    role: "Gaffer"
  },
  {
    quote: "Placeholder today, but the promise is exactly what working crews ask for.",
    name: "Marco L.",
    role: "Director / Operator"
  }
];

export function SocialProof() {
  return (
    <section className="section-divider relative py-24">
      <SectionShell>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow-font mb-3 text-xs font-semibold text-venom/80">Social proof</p>
            <h2 className="display-font text-4xl text-white sm:text-5xl">Built with working filmmakers</h2>
          </div>
          <p className="max-w-lg text-white/62">
            Early validation from crews who need repeatable clamping without losing tempo.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="industrial-panel rounded-[1.75rem] p-6"
            >
              <p className="text-lg leading-8 text-white/82">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {testimonial.name}
              </p>
              <p className="mt-2 text-sm text-white/50">{testimonial.role}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
