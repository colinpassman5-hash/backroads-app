"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CheckoutSummary({ provider }: { provider: string }) {
  const { items, subtotal } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
        <p className="eyebrow-font text-xs text-venom/78">Order summary</p>
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-5 text-white/60">
              Your cart is currently empty. Add a product before moving into checkout.
            </div>
          ) : null}
          {items.map((item) => (
            <div key={item.slug} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="w-20 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-white">
                <Image src={item.image} alt={item.name} width={240} height={240} className="h-auto w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-white/50">Qty {item.quantity}</p>
                <p className="mt-2 text-sm text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Subtotal</span>
            <span className="text-lg text-white">${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">
            Final tax, shipping, and payment routing connect at live checkout.
          </p>
        </div>
      </div>

      <div className="mesh-panel rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
        <p className="eyebrow-font text-xs text-venom/78">Checkout flow</p>
        <h2 className="display-font mt-4 text-4xl leading-none text-white">Provider-ready buying path.</h2>
        <p className="mt-5 text-white/65">
          The storefront, cart, and handoff logic are built. The final live payment step can be connected to Stripe or
          Shopify as soon as Cobra Grip has its business entity and payment account in place.
        </p>
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/25 p-5">
          <p className="text-sm text-white/45">Current checkout provider</p>
          <p className="mt-2 text-2xl text-white">{provider}</p>
          <p className="mt-2 text-sm text-white/52">Swap this to Stripe or Shopify later without rebuilding the storefront.</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black"
          >
            Back to products
          </Link>
          <Link
            href="/shipping"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white"
          >
            Review shipping
          </Link>
        </div>
      </div>
    </div>
  );
}
