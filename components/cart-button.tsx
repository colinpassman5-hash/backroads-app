"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/cart-provider";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <motion.button
      type="button"
      onClick={openCart}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold uppercase tracking-[0.22em] text-white"
    >
      Cart
      <span className="ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-venom px-2 text-[11px] font-black text-black">
        {itemCount}
      </span>
    </motion.button>
  );
}
