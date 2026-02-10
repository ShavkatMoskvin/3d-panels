"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export function AddToCart({ 
  product, 
  showIconOnly = false 
}: { 
  product: Product, 
  showIconOnly?: boolean 
}) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (showIconOnly) {
    return (
      <Button 
        size="icon"
        className={`w-12 h-12 rounded-none border border-slate-900 transition-all ${
          isAdded ? "bg-green-600 border-green-600 text-white" : "bg-slate-900 text-white hover:bg-blue-600 hover:border-blue-600"
        }`}
        onClick={handleAdd}
      >
        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      </Button>
    );
  }

  return (
    <Button 
      size="lg" 
      className={`w-full md:w-auto px-8 rounded-none py-8 uppercase tracking-widest text-xs transition-all ${
        isAdded ? "bg-green-600 hover:bg-green-700" : "bg-slate-900 hover:bg-blue-600"
      }`}
      onClick={handleAdd}
    >
      {isAdded ? "Добавлено!" : "Добавить в корзину"}
    </Button>
  );
}
