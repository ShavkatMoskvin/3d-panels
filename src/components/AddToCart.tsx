"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";

export function AddToCart({ 
  product, 
  showIconOnly = false,
  initialQuantity
}: { 
  product: Product, 
  showIconOnly?: boolean,
  initialQuantity?: number
}) {
  const { items, addToCart, updateQuantity } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const [localQuantity, setLocalQuantity] = useState<string>(quantity.toString());

  // Синхронизируем локальное состояние, если количество в корзине изменилось извне
  useEffect(() => {
    if (quantity > 0) {
      setLocalQuantity(quantity.toString());
    }
  }, [quantity]);

  const handleAdd = () => {
    const q = initialQuantity || 1;
    addToCart(product, q);
    setLocalQuantity(q.toString());
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    updateQuantity(product.id, newQty);
    setLocalQuantity(newQty.toString());
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      updateQuantity(product.id, newQty);
      setLocalQuantity(newQty.toString());
    } else if (quantity === 1) {
      updateQuantity(product.id, 0);
      setLocalQuantity("0");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuantity(e.target.value);
  };

  const handleInputBlur = () => {
    const value = parseInt(localQuantity);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(product.id, value);
      setLocalQuantity(value.toString());
    } else {
      // Если введено некорректное значение, возвращаем старое
      setLocalQuantity(quantity.toString());
    }
  };

  if (quantity > 0) {
    return (
      <div className={`flex items-center border border-slate-900 overflow-hidden bg-white shadow-sm transition-all hover:border-blue-600 ${showIconOnly ? 'w-24 h-12' : 'w-full md:w-auto py-3 md:py-4'}`}>
        <button 
          onClick={handleDecrement}
          className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors group"
          aria-label="Уменьшить количество"
        >
          <Minus className="w-4 h-4 text-slate-900 group-hover:text-blue-600 transition-colors" />
        </button>
        <div className="flex-1 min-w-[70px] h-full flex items-center justify-center border-x border-slate-100 px-2">
          <input 
            type="number"
            value={localQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-full text-center text-sm font-bold uppercase tracking-widest outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="0"
          />
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1 select-none">шт.</span>
        </div>
        <button 
          onClick={handleIncrement}
          className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors group"
          aria-label="Увеличить количество"
        >
          <Plus className="w-4 h-4 text-slate-900 group-hover:text-blue-600 transition-colors" />
        </button>
      </div>
    );
  }

  if (showIconOnly) {
    return (
      <Button 
        size="icon"
        className={`w-12 h-12 rounded-none border border-slate-900 transition-all ${
          isAdded ? "bg-green-600 border-green-600 text-white" : "bg-slate-900 text-white hover:bg-blue-600 hover:border-blue-600"
        }`}
        onClick={handleAdd}
      >
        {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
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
      {isAdded ? "Добавлено!" : initialQuantity ? `Добавить ${initialQuantity} шт. в корзину` : "Добавить в корзину"}
    </Button>
  );
}
