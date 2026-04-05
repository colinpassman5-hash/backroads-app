import { getProductBySlug } from "@/lib/products";

export type CheckoutLineItem = {
  slug: string;
  quantity: number;
};

export function getCheckoutConfig() {
  return {
    provider: process.env.CHECKOUT_PROVIDER?.toLowerCase().trim() || "internal",
    stripePaymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_URL || "",
    shopifyStoreUrl: process.env.SHOPIFY_STOREFRONT_URL || ""
  };
}

export function buildInternalCheckoutUrl(items: CheckoutLineItem[]) {
  const params = new URLSearchParams();
  params.set("items", JSON.stringify(items));
  return `/checkout?${params.toString()}`;
}

export function buildCheckoutUrl(items: CheckoutLineItem[]) {
  const config = getCheckoutConfig();

  if (config.provider === "stripe" && config.stripePaymentLinkUrl) {
    return config.stripePaymentLinkUrl;
  }

  if (config.provider === "shopify" && config.shopifyStoreUrl) {
    return `${config.shopifyStoreUrl.replace(/\/$/, "")}/cart`;
  }

  return buildInternalCheckoutUrl(items);
}

export function hydrateCheckoutItems(items: CheckoutLineItem[]) {
  return items
    .map((item) => {
      const product = getProductBySlug(item.slug);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity
      };
    })
    .filter(Boolean);
}
