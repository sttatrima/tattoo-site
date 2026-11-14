import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { getProductByHandle } from "@/data/products";

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | INK STUDIO`,
    description: product.description,
    openGraph: {
      title: `${product.title} | INK STUDIO`,
      description: product.description,
      images: [{ url: product.featuredImage }],
    },
  };
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle);
  if (!product) notFound();

  const isInStock = product.stockStatus === "in_stock";
  const priceFormatted = (product.price / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <nav className="container py-4" aria-label="Breadcrumb">
        <Link href="/" className="text-xs text-muted-foreground hover:text-accent transition-colors">
          Home
        </Link>
        <span className="text-xs text-muted-foreground mx-1">/</span>
        <Link href={`/collections/${product.category}`} className="text-xs text-muted-foreground hover:text-accent transition-colors">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="text-xs text-muted-foreground mx-1">/</span>
        <span className="text-xs font-medium">{product.title}</span>
      </nav>

      <section className="container py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden border border-border">
              <Image
                src={product.featuredImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {!isInStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-lg font-bold text-destructive">Sold Out</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <button key={i} className="aspect-square bg-muted rounded-lg border border-border hover:border-accent transition-colors">
                  <Image src={product.images[i] || product.featuredImage} alt={`Detail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{product.currency === "GBP" ? "£" : ""}{priceFormatted}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {(product.compareAtPrice / 100).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${isInStock ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                {isInStock ? "In Stock" : "Sold Out"}
              </span>
            </div>

            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="bg-muted rounded-xl p-6 border border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Details</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex justify-between">
                  <span>Category</span>
                  <span>{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>SKU</span>
                  <span>{product.id}</span>
                </li>
                {product.artistId && (
                  <li className="flex justify-between">
                    <span>Artist</span>
                    <Link href={`/artists/${product.artistId}`} className="text-accent hover:underline">
                      View Artist
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-4">
              {isInStock ? (
                <Button className="w-full" size="lg">
                  Add to Cart
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Sold Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
