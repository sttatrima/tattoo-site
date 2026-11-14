"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/Button";
import { Product } from "@/data/products";

interface AddToCartButtonProps {
  product: Product;
  isInStock: boolean;
}

export function AddToCartButton({ product, isInStock }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      className="w-full bg-accent text-background hover:bg-accent-hover"
      size="lg"
      onClick={() => addItem(product)}
      disabled={!isInStock}
    >
      {isInStock ? "Add to Cart" : "Sold Out"}
    </Button>
  );
}
