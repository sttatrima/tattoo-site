import { MetadataRoute } from "next";

const siteUrl = "https://inkstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about-us",
    "/aftercare",
    "/faqs",
    "/#gallery",
    "/#artists",
    "/#booking",
    "/#shop",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const artistPages = [
    "marcus-black",
    "sofia-rivera",
    "jin-park",
    "elena-volkov",
  ].map((slug) => ({
    url: `${siteUrl}/artists/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPages = [
    "ormis-tattoo-aftercare-tattoo-wash",
    "purple-raspberry-aftercare-cream",
    "biker-logo-tote-bag",
    "biker-tee",
    "portrait-t-shirt",
    "hummingbird-skull-a4-print-ryan-farmery",
    "afflux-portrait-a4-print-lauren-roberts",
    "gift-card",
  ].map((handle) => ({
    url: `${siteUrl}/products/${handle}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const collectionPages = [
    "aftercare",
    "apparel",
    "prints",
    "gift-cards",
  ].map((handle) => ({
    url: `${siteUrl}/collections/${handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...artistPages, ...productPages, ...collectionPages];
}
