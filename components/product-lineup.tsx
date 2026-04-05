"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionShell } from "@/components/ui";

const products = [
  {
    name: "Quack Attack",
    status: "Launch Product",
    description:
      "Locked-design prototype for everyday edge mounting with a sleek moving front jaw and a more rugged fixed back body.",
    callout: "Flagship"
  },
  {
    name: "Prototype Targets",
    status: "Rev 1",
    description: "70-74 mm width, 80-84 mm height, 36-40 mm depth, with a practical sweet spot of 15-35 mm clamp range.",
    callout: "Working dims"
  },
  {
    name: "Materials Stack",
    status: "Prototype BOM",
    description: "Nylon or CF-nylon body, steel pawl, TPU pads, and a thin steel magnet receiver plate.",
    callout: "Engineerable now"
  }
];

export function ProductLineup() {
  return (
    <section id="lineup" className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow-font mb-4 text-xs text-venom/78">Launch assortment</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">Build the brand like a system.</h2>
          </div>
          <p className="max-w-xl text-white/62">
            The packet gives us enough real information to show the product with honest prototype targets instead of
            empty placeholders.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`industrial-panel rounded-[2rem] p-7 ${index === 0 ? "lg:min-h-[28rem]" : ""}`}
            >
              <p className="eyebrow-font text-xs text-venom/78">{product.status}</p>
              <h3 className="display-font mt-4 text-3xl leading-none text-white sm:text-4xl">{product.name}</h3>
              <p className="mt-4 text-white/62">{product.description}</p>
              <div className="mt-10 flex items-end justify-between">
                <span className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  {product.callout}
                </span>
                <span className="text-2xl text-venom/72">{index === 0 ? "01" : index === 1 ? "02" : "03"}</span>
              </div>
              <Link href={index === 0 ? "/products/quack-attack" : "/products"} className="mt-6 inline-block text-sm uppercase tracking-[0.22em] text-venom">
                {index === 0 ? "View product" : "Browse catalog"}
              </Link>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
