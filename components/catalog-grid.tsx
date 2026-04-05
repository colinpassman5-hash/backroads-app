import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SectionShell } from "@/components/ui";

export function CatalogGrid() {
  return (
    <section className="section-divider relative py-24 md:py-32">
      <SectionShell>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow-font mb-4 text-xs text-venom/78">Products</p>
            <h2 className="display-font text-4xl leading-none text-white sm:text-6xl">Hardware-first catalog structure.</h2>
          </div>
          <p className="max-w-xl text-white/62">
            The catalog is seeded now so Cobra Grip behaves like a real commercial brand while the product family grows.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="industrial-panel group rounded-[2rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/14"
            >
              <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white">
                <Image src={product.image} alt={product.name} width={828} height={255} className="h-auto w-full object-cover" />
              </div>
              <p className="eyebrow-font mt-5 text-xs text-venom/78">{product.status.replace("-", " ")}</p>
              <h3 className="display-font mt-3 text-3xl leading-none text-white">{product.name}</h3>
              <p className="mt-3 text-sm text-white/62">{product.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/55"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-semibold text-white">${product.price.toFixed(2)}</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm uppercase tracking-[0.22em] text-venom transition group-hover:translate-x-1"
                >
                  View product
                </Link>
              </div>
              <div className="mt-5">
                <AddToCartButton
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  disabled={product.status === "coming-soon"}
                  label={product.status === "coming-soon" ? "Coming Soon" : "Add to Cart"}
                />
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
