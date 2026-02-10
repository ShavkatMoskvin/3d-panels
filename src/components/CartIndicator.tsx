"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CartIndicator() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart">
      <Button variant="outline" className="relative flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        <span className="hidden sm:inline">Корзина</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in fade-in zoom-in">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
}
