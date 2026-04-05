export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: "USD";
  status: "prototype" | "preorder" | "coming-soon";
  featured: boolean;
  image: string;
  secondaryImage?: string;
  specs: Array<{ label: string; value: string }>;
  features: string[];
  includes: string[];
  seoDescription: string;
};

export const products: Product[] = [
  {
    slug: "quack-attack",
    name: "Quack Attack",
    tagline: "Surface-safe squeeze-to-lock edge mount",
    shortDescription:
      "A premium prototype clamp system for fast edge mounting, exact tension, and instant release.",
    description:
      "Quack Attack is the flagship Cobra Grip launch product: a two-body squeeze-to-lock clamp with a moving front jaw, fixed back body, centered magnet plate, and a release action designed for real grip and electric workflow.",
    price: 189,
    currency: "USD",
    status: "prototype",
    featured: true,
    image: "/products/quack-attack-views.png",
    specs: [
      { label: "Clamp range", value: "12-38 mm target" },
      { label: "Width", value: "70-74 mm" },
      { label: "Height", value: "80-84 mm" },
      { label: "Depth", value: "36-40 mm" },
      { label: "Pad system", value: "Broad TPU protection" },
      { label: "Mount interface", value: "Centered magnet plate + lip" }
    ],
    features: [
      "Manual squeeze-to-lock ratchet mechanism",
      "Surface-safe preload strategy for common edges",
      "Technical back interface with cheeseplate geometry",
      "Fast release action for repeat setups"
    ],
    includes: [
      "Launch access to Quack Attack",
      "Prototype progress updates",
      "Early product availability notices"
    ],
    seoDescription:
      "Explore Quack Attack, Cobra Grip's flagship squeeze-to-lock edge mounting tool for grip and electric crews."
  },
  {
    slug: "bite-plate",
    name: "Bite Plate",
    tagline: "Accessory mounting platform",
    shortDescription:
      "A future ecosystem plate concept designed to expand the Cobra Grip mounting surface and accessory story.",
    description:
      "Bite Plate is a future accessory placeholder that shows where the Cobra Grip ecosystem can grow. It is currently positioned as a coming-soon product to support the catalog architecture.",
    price: 79,
    currency: "USD",
    status: "coming-soon",
    featured: false,
    image: "/brand/cobra-icon.png",
    specs: [
      { label: "Status", value: "Coming soon" },
      { label: "Category", value: "Accessory concept" }
    ],
    features: ["System expansion placeholder", "Accessory ecosystem ready", "Built to support catalog growth"],
    includes: ["Future release notifications"],
    seoDescription: "Preview Bite Plate, a future Cobra Grip accessory concept."
  },
  {
    slug: "fang-mini",
    name: "Fang Mini",
    tagline: "Compact clamp concept",
    shortDescription:
      "A compact future variant concept for tighter kits, smaller builds, and fast-moving camera support.",
    description:
      "Fang Mini is a placeholder compact product concept used to establish a real products catalog and future-proof the store architecture.",
    price: 129,
    currency: "USD",
    status: "coming-soon",
    featured: false,
    image: "/brand/cobra-icon.png",
    specs: [
      { label: "Status", value: "Coming soon" },
      { label: "Category", value: "Compact concept" }
    ],
    features: ["Small-footprint catalog placeholder", "Supports future product family planning"],
    includes: ["Future release notifications"],
    seoDescription: "Preview Fang Mini, a future Cobra Grip compact clamp concept."
  }
];

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
