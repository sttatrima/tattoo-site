/**
 * JSON-LD Structured Data Generators
 * Aligned with Adara Tattoo Collective blueprint SEO patterns
 */

export interface StudioData {
  name: string;
  url: string;
  logo: string;
  image: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  openingHours: string[];
  priceRange: string;
}

export const studioData: StudioData = {
  name: "INK STUDIO",
  url: "https://inkstudio.com",
  logo: "/og-image.jpg",
  image: "/og-image.jpg",
  address: {
    streetAddress: "10 East Parade, Heworth",
    addressLocality: "York",
    addressRegion: "North Yorkshire",
    postalCode: "YO31 7YJ",
    addressCountry: "GB",
  },
  telephone: "+441904671118",
  email: "hello@inkstudio.com",
  openingHours: ["Tu,Th,Sa 10:30-17:30"],
  priceRange: "££",
};

/**
 * Generate LocalBusiness JSON-LD for the tattoo studio
 */
export function generateLocalBusinessJsonLd(): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `${studioData.url}#business`,
    name: studioData.name,
    url: studioData.url,
    logo: studioData.logo,
    image: studioData.image,
    telephone: studioData.telephone,
    email: studioData.email,
    priceRange: studioData.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: studioData.address.streetAddress,
      addressLocality: studioData.address.addressLocality,
      addressRegion: studioData.address.addressRegion,
      postalCode: studioData.address.postalCode,
      addressCountry: studioData.address.addressCountry,
    },
    openingHours: studioData.openingHours,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9603,
      longitude: -1.0742,
    },
    sameAs: [
      "https://www.instagram.com/adara_tattoo_collective/",
      "https://www.facebook.com/AdaraTattooCollective/",
      "https://www.tiktok.com/@adara.tattoo",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tattoo Services",
      itemOffered: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Tattoo",
            description: "Custom tattoo design and application by award-winning artists",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Body Piercing",
            description: "Professional body piercing services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tattoo Aftercare",
            description: "Professional aftercare products and advice",
          },
        },
      ],
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Generate Person JSON-LD for a tattoo artist
 */
export function generateArtistJsonLd({
  name,
  slug,
  bio,
  image,
  url,
  email,
  instagram,
}: {
  name: string;
  slug: string;
  bio: string;
  image: string;
  url: string;
  email: string;
  instagram?: string;
}): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#artist`,
    name,
    url,
    image,
    description: bio,
    email,
    jobTitle: "Tattoo Artist",
    worksFor: {
      "@type": "TattooParlor",
      "@id": `${studioData.url}#business`,
      name: studioData.name,
    },
    sameAs: instagram ? [instagram] : [],
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Generate Product JSON-LD for shop items
 */
export function generateProductJsonLd({
  name,
  handle,
  description,
  price,
  currency,
  image,
  inStock,
  sku,
  url,
}: {
  name: string;
  handle: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  inStock: boolean;
  sku: string;
  url: string;
}): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name,
    description,
    image,
    sku,
    url,
    brand: {
      "@type": "Brand",
      name: studioData.name,
    },
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      price: (price / 100).toFixed(2),
      priceCurrency: currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: studioData.name,
      },
      url,
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
