import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { getCollectionByHandle, collections, getProductsByCategory } from "@/data/products";

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const collection = getCollectionByHandle(params.handle);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.title} | INK STUDIO`,
    description: collection.description,
  };
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const collection = getCollectionByHandle(params.handle);
  if (!collection) notFound();

  const categoryProducts = getProductsByCategory(collection.handle);

  return (
    <div className="min-h-screen bg-background">
      {/* Collection Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative z-10 flex h-full items-center p-6 md:p-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{collection.title}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{collection.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-2">Products ({categoryProducts.length})</h2>
              <p className="text-sm text-muted-foreground">Browse our {collection.title.toLowerCase()} collection.</p>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => {
                const isInStock = product.stockStatus === "in_stock";
                const priceFormatted = (product.price / 100).toFixed(2);
                return (
                  <article key={product.id} className="group relative bg-muted rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-colors duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.featuredImage}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                      />
                      {!isInStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-lg font-bold text-destructive">Sold Out</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="ghost" size="sm" className="p-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3v12h12M3 3l9 9" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <Link href={`/products/${product.handle}`} className="block">
                        <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{product.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">{product.currency === "GBP" ? "£" : ""}{priceFormatted}</span>
                          {!isInStock && (
                            <span className="text-sm text-destructive font-medium">Sold Out</span>
                          )}
                        </div>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products available in this collection yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
