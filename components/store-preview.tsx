import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getFeaturedProducts } from "@/lib/products";
import { SectionShell } from "@/components/ui";

export function StorePreview() {
  const featured = getFeaturedProducts();

  return (
    <section className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow-font mb-4 text-xs text-venom/78">Store preview</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">
              Story first. Store second. No dead ends.
            </h2>
          </div>
          <p className="max-w-xl text-white/62">
            Visitors can move from the brand promise into product detail, cart, and checkout handoff without the site
            collapsing into placeholder territory.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {featured.map((product) => (
            <article key={product.slug} className="industrial-panel rounded-[2rem] p-5">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white">
                  <Image src={product.image} alt={product.name} width={828} height={255} className="h-auto w-full object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="eyebrow-font text-xs text-venom/78">{product.status.replace("-", " ")}</p>
                    <h3 className="display-font mt-4 text-4xl leading-none text-white">{product.name}</h3>
                    <p className="mt-4 text-lg text-white/68">{product.tagline}</p>
                    <p className="mt-4 max-w-lg text-white/60">{product.shortDescription}</p>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} />
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white"
                    >
                      View product
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <aside className="industrial-panel mesh-panel rounded-[2rem] p-6">
            <p className="eyebrow-font text-xs text-venom/78">Checkout readiness</p>
            <h3 className="display-font mt-4 text-3xl leading-none text-white">Prepared for real commerce later.</h3>
            <div className="mt-6 grid gap-3 text-white/62">
              <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4">Persistent cart across the storefront.</div>
              <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4">Provider-ready handoff for Stripe or Shopify.</div>
              <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4">Launch now, plug in payments when the business stack is ready.</div>
            </div>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black"
            >
              Browse products
            </Link>
          </aside>
        </div>
      </SectionShell>
    </section>
  );
}
