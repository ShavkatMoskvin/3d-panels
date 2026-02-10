"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button 
      size="lg" 
      className={`w-full md:w-auto px-8 transition-all ${isAdded ? "bg-green-600 hover:bg-green-700" : ""}`}
      onClick={handleAdd}
    >
      {isAdded ? "Добавлено!" : "Добавить в корзину"}
    </Button>
  );
}
