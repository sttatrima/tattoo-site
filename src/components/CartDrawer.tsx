"use client";

import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  const currency = "GBP";
  const formatPrice = (p: number) => (p / 100).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex" aria-label="Shopping cart">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={closeCart} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-muted-foreground/50">
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button href="/" className="mt-4 w-full md:w-auto">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const isInStock = item.stockStatus === "in_stock";
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="flex gap-4 py-3 border-b border-border/50">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.featuredImage} alt={item.title} fill className="object-cover" />
                      {!isInStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-xs font-bold text-destructive">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.handle}`} className="block">
                        <h3 className="font-medium text-sm leading-tight group-hover:text-accent transition-colors">{item.title}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.currency === "GBP" ? "£" : ""}{formatPrice(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={!isInStock}
                          className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center hover:bg-muted/80 disabled:opacity-50"
                          aria-label={`Decrease ${item.title}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!isInStock}
                          className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center hover:bg-muted/80 disabled:opacity-50"
                          aria-label={`Increase ${item.title}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right min-w-[60px]">
                      <span className="font-medium block">{item.currency === "GBP" ? "£" : ""}{formatPrice(itemTotal)}</span>
                      {!isInStock && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-destructive mt-1 hover:underline"
                          aria-label={`Remove ${item.title}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-background/50 p-6">
          <div className="flex justify-between mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{currency === "GBP" ? "£" : ""}{formatPrice(subtotal)}</span>
          </div>
          {items.length > 0 && items.every((i) => i.stockStatus === "in_stock") ? (
            <div className="space-y-3">
              <Button className="w-full bg-accent text-background hover:bg-accent-hover">
                Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              Items Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-3 text-muted-foreground hover:text-accent transition-colors"
      aria-label={`Shopping cart (${itemCount} items)`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="2" />
        <path d="M19 4v2l-3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h.33l2.67 3.24a1 1 0 0 0 .91.57H18.5a1 1 0 0 1 1 1v1" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-accent text-[10px] font-bold text-background flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
