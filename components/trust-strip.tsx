import { SectionShell } from "@/components/ui";

const items = [
  {
    title: "Real waitlist capture",
    body: "Lead collection is live, protected against abuse, and ready to route into your actual launch stack."
  },
  {
    title: "Store architecture live",
    body: "Catalog, product pages, cart state, and checkout handoff already behave like a commercial storefront."
  },
  {
    title: "Built for launch",
    body: "Security headers, request validation, and deploy-ready support pages are already in the foundation."
  }
];

export function TrustStrip() {
  return (
    <section className="section-divider relative py-14">
      <SectionShell>
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="industrial-panel rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/14">
              <p className="eyebrow-font text-[10px] text-venom/78">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/62">{item.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
