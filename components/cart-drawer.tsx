"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";
import { buildCheckoutUrl } from "@/lib/checkout";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  const checkoutUrl = buildCheckoutUrl(
    items.map((item) => ({
      slug: item.slug,
      quantity: item.quantity
    }))
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0c0c0c] p-6 shadow-[-24px_0_80px_rgba(0,0,0,0.42)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow-font text-xs text-venom/76">Cart</p>
                <h2 className="display-font mt-2 text-3xl leading-none text-white">Built for checkout.</h2>
              </div>
              <button type="button" onClick={closeCart} className="text-sm uppercase tracking-[0.24em] text-white/60">
                Close
              </button>
            </div>

            <div className="mt-8 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white/60">
                  Your cart is empty. Add Quack Attack or future Cobra Grip gear from the catalog.
                </div>
              ) : null}

              {items.map((item) => (
                <div key={item.slug} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-white">
                      <Image src={item.image} alt={item.name} width={240} height={240} className="h-auto w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-white/55">${item.price.toFixed(2)}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="h-8 w-8 rounded-full text-white/70"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="h-8 w-8 rounded-full text-white/70"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-xs uppercase tracking-[0.2em] text-white/45"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                Taxes and live shipping rates connect when your payment stack goes live.
              </p>
              <div className="mb-4 flex items-center justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span className="text-lg text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="grid gap-3">
                <Link
                  href={checkoutUrl}
                  className="inline-flex items-center justify-center rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black"
                >
                  Checkout
                </Link>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white"
                >
                  Keep shopping
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
