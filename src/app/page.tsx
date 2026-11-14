import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { ArtistsSection } from "@/components/ArtistsSection";
import { BookingForm } from "@/components/BookingForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { collections } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <ArtistsSection />
        <CollectionsSection />
        <BookingForm />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

function CollectionsSection() {
  return (
    <section id="shop" className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Adara Store</h2>
            <p className="text-muted-foreground">Aftercare, apparel, prints & gift cards</p>
          </div>
          <Link href="/collections/all" className="text-sm font-medium text-accent hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <article
              key={collection.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-background border border-border hover:border-accent/50 transition-colors duration-300"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-xs font-medium text-accent uppercase tracking-wider block mb-2">
                    {collection.productCount} items
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{collection.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
