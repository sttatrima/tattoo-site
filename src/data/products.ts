export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  featuredImage: string;
  thumbnail: string;
  category: "aftercare" | "apparel" | "prints" | "gift-cards";
  stockStatus: "in_stock" | "low_stock" | "sold_out";
  tags: string[];
  artistId?: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: "1",
    handle: "aftercare",
    title: "Aftercare",
    description: "Professional tattoo aftercare products developed by our artists.",
    image: "/collections/aftercare.jpg",
    productCount: 2,
  },
  {
    id: "2",
    handle: "apparel",
    title: "Apparel",
    description: "Studio merchandise including tote bags and t-shirts.",
    image: "/collections/apparel.jpg",
    productCount: 3,
  },
  {
    id: "3",
    handle: "prints",
    title: "Prints",
    description: "Limited edition art prints by our resident artists.",
    image: "/collections/prints.jpg",
    productCount: 2,
  },
  {
    id: "4",
    handle: "gift-cards",
    title: "Gift Cards",
    description: "The perfect gift for anyone looking to get tattooed.",
    image: "/collections/gift-cards.jpg",
    productCount: 1,
  },
];

export const products: Product[] = [
  {
    id: "1",
    handle: "ormis-tattoo-aftercare-tattoo-wash",
    title: "Ormis Tattoo | Aftercare Tattoo Wash",
    description: "Gentle, pH-balanced tattoo wash developed by Lauren. Specially formulated for fresh tattoos to cleanse without irritation.",
    price: 500,
    currency: "GBP",
    images: ["/tattoos/ormis-1.jpg", "/tattoos/ormis-2.jpg"],
    featuredImage: "/tattoos/ormis-1.jpg",
    thumbnail: "/tattoos/ormis-1-thumb.jpg",
    category: "aftercare",
    stockStatus: "in_stock",
    tags: ["aftercare", "cleanser", "fresh-tattoo"],
  },
  {
    id: "2",
    handle: "purple-raspberry-aftercare-cream",
    title: "Purple Raspberry Aftercare Cream",
    description: "Nourishing aftercare cream with shea butter and vitamin E. Helps heal and protect fresh ink.",
    price: 700,
    currency: "GBP",
    images: ["/tattoos/aftercare-cream-1.jpg"],
    featuredImage: "/tattoos/aftercare-cream-1.jpg",
    thumbnail: "/tattoos/aftercare-cream-1-thumb.jpg",
    category: "aftercare",
    stockStatus: "sold_out",
    tags: ["aftercare", "cream", "healing"],
  },
  {
    id: "3",
    handle: "biker-logo-tote-bag",
    title: "Biker Logo Tote Bag",
    description: "Heavy cotton canvas tote bag with studio logo. Perfect for carrying your tattoo supplies or daily essentials.",
    price: 1000,
    currency: "GBP",
    images: ["/tattoos/tote-bag-1.jpg"],
    featuredImage: "/tattoos/tote-bag-1.jpg",
    thumbnail: "/tattoos/tote-bag-1-thumb.jpg",
    category: "apparel",
    stockStatus: "in_stock",
    tags: ["apparel", "tote", "merch"],
  },
  {
    id: "4",
    handle: "biker-tee",
    title: "Biker - T-Shirt",
    description: "100% organic cotton t-shirt with studio biker logo printed on chest.",
    price: 1000,
    currency: "GBP",
    images: ["/tattoos/tee-1.jpg"],
    featuredImage: "/tattoos/tee-1.jpg",
    thumbnail: "/tattoos/tee-1-thumb.jpg",
    category: "apparel",
    stockStatus: "sold_out",
    tags: ["apparel", "t-shirt", "merch"],
  },
  {
    id: "5",
    handle: "portrait-t-shirt",
    title: "Portrait - T-Shirt",
    description: "Organic cotton t-shirt featuring original portrait artwork by Lauren Gabb.",
    price: 1000,
    currency: "GBP",
    images: ["/tattoos/tee-2.jpg"],
    featuredImage: "/tattoos/tee-2.jpg",
    thumbnail: "/tattoos/tee-2-thumb.jpg",
    category: "apparel",
    stockStatus: "sold_out",
    tags: ["apparel", "t-shirt", "merch"],
  },
  {
    id: "6",
    handle: "hummingbird-skull-a4-print-ryan-farmery",
    title: "Hummingbird Skull - A4 Print (Ryan Farmery)",
    description: "Limited edition A4 art print by Ryan Farmery. Archival matte paper, signed by the artist.",
    price: 1000,
    currency: "GBP",
    images: ["/tattoos/hummingbird-print-1.jpg"],
    featuredImage: "/tattoos/hummingbird-print-1.jpg",
    thumbnail: "/tattoos/hummingbird-print-1-thumb.jpg",
    category: "prints",
    stockStatus: "sold_out",
    tags: ["prints", "ryan-farmery", "limited-edition"],
    artistId: "3",
  },
  {
    id: "7",
    handle: "afflux-portrait-a4-print-lauren-roberts",
    title: "Afflux Portrait - A4 Print (Lauren Roberts)",
    description: "Limited edition A4 art print by Lauren Roberts. Archival matte paper, signed by the artist.",
    price: 900,
    currency: "GBP",
    images: ["/tattoos/afflux-print-1.jpg"],
    featuredImage: "/tattoos/afflux-print-1.jpg",
    thumbnail: "/tattoos/afflux-print-1-thumb.jpg",
    category: "prints",
    stockStatus: "sold_out",
    tags: ["prints", "lauren-roberts", "limited-edition"],
    artistId: "2",
  },
  {
    id: "8",
    handle: "gift-card",
    title: "Gift Card",
    description: "Digital gift card redeemable for tattoo sessions, aftercare, or studio merchandise.",
    price: 1000,
    currency: "GBP",
    images: ["/tattoos/gift-card-1.jpg"],
    featuredImage: "/tattoos/gift-card-1.jpg",
    thumbnail: "/tattoos/gift-card-1-thumb.jpg",
    category: "gift-cards",
    stockStatus: "in_stock",
    tags: ["gift-card", "digital"],
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getProductsByArtist(artistId: string): Product[] {
  return products.filter((p) => p.artistId === artistId);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}
