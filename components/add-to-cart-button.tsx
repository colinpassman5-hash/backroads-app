"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  slug: string;
  name: string;
  price: number;
  image: string;
  disabled?: boolean;
  label?: string;
};

export function AddToCartButton({
  slug,
  name,
  price,
  image,
  disabled = false,
  label = "Add to Cart"
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => addItem({ slug, name, price, image })}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="inline-flex items-center justify-center rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black shadow-venom transition disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </motion.button>
  );
}
