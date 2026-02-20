"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Check, Minus, Plus, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export function AddToCart({ 
  product, 
  showIconOnly = false,
  initialQuantity,
  selectedVariation,
  selectedColor,
  kitItems,
  extraItems
}: { 
  product: Product, 
  showIconOnly?: boolean,
  initialQuantity?: number,
  selectedVariation?: { size: string; price: number },
  selectedColor?: string,
  kitItems?: Product['bundleItems'],
  extraItems?: { product: Product, quantity: number }[]
}) {
  const { items, addToCart, updateQuantity } = useCart();
  
  // Определяем наличие товара с учетом выбранного цвета
  const inStock = selectedColor 
    ? product.colors?.find(c => c.name === selectedColor)?.inStock ?? product.inStock
    : product.inStock;

  const isPanel = ['gypsum', 'flexible-stone', 'travertine'].includes(product.category);
  const [isAdded, setIsAdded] = useState(false);
  // Блок рекомендаций теперь виден всегда для панелей
  const [showUpsell, setShowUpsell] = useState(isPanel);

  useEffect(() => {
    setShowUpsell(isPanel);
  }, [isPanel]);
  
  // Находим монтажный комплект в данных
  const mountingKit = PRODUCTS.find(p => p.slug === 'mounting-kit-pro');
  
  // Находим монтажный комплект в корзине для управления количеством в Upsell
  // Так как мы разделили набор, проверяем по первому элементу набора (например, шпатель)
  const firstKitItem = mountingKit?.bundleItems?.[0];
  const kitInCart = firstKitItem ? items.find(item => item.id === firstKitItem.id) : null;
  const kitQuantity = firstKitItem && kitInCart ? Math.floor(kitInCart.quantity / firstKitItem.quantity) : 0;

  // Если это набор (у товара есть kitItems), то количество в корзине считаем по первому компоненту
  const isKitProduct = kitItems && kitItems.length > 0;
  
  const itemId = `${product.id}-${selectedVariation?.size || 'default'}-${selectedColor || 'default'}`;
  
  const cartItem = items.find(item => {
    const currentItemId = `${item.id}-${item.selectedVariation?.size || 'default'}-${item.selectedColor || 'default'}`;
    return currentItemId === itemId;
  });

  // Для набора количество — это минимальное количество его составляющих (упрощенно по первому)
  const quantity = isKitProduct 
    ? (kitItems && kitItems[0] ? Math.floor((items.find(i => i.id === kitItems[0].id)?.quantity || 0) / kitItems[0].quantity) : 0)
    : (cartItem?.quantity || 0);

  const [localQuantity, setLocalQuantity] = useState<string>(quantity.toString());

  // Синхронизируем локальное состояние, если количество в корзине изменилось извне
  // ИЛИ если пришло новое initialQuantity от калькулятора
  useEffect(() => {
    setLocalQuantity(quantity.toString());
  }, [quantity]);

  // Используем ref для отслеживания изменений initialQuantity, чтобы избежать зацикливания
  // при изменении quantity (когда пользователь меняет количество вручную)
  const prevInitialQuantity = useRef(initialQuantity);

  useEffect(() => {
    // Если initialQuantity изменился (пришел новый от калькулятора)
    if (initialQuantity && initialQuantity !== prevInitialQuantity.current) {
      prevInitialQuantity.current = initialQuantity;
      
      // Если это панель и есть initialQuantity (от калькулятора), синхронизируем
      if (isPanel) {
        setLocalQuantity(initialQuantity.toString());
        // Если товар уже в корзине (quantity > 0), обновляем его количество до рассчитанного калькулятором
        if (quantity > 0 && quantity !== initialQuantity) {
          updateQuantity(itemId, initialQuantity);
        }
      }
    }
  }, [initialQuantity, itemId, quantity, updateQuantity, isPanel]);

  const handleAdd = () => {
    const q = initialQuantity || 1;
    
    // Добавляем основной товар только если это НЕ набор
    // (Если это набор, мы добавляем только его компоненты)
    if (!isKitProduct) {
      addToCart(product, q, selectedVariation, selectedColor);
    }
    
    // Если есть kitItems (состав набора), добавляем их как отдельные товары
    if (isKitProduct) {
      kitItems.forEach(item => {
        const fakeProduct: Product = {
          id: item.id,
          name: item.name,
          price: item.price,
          slug: item.slug || "",
          images: [item.image || ""],
          category: "accessories",
          description: "",
          specifications: { material: "", width: 0, height: 0, depth: 0 },
          colors: [],
          variations: [],
          stockCount: 100,
          inStock: true
        };
        addToCart(fakeProduct, item.quantity * q);
      });
    }
    
    // Добавляем дополнительные товары из калькулятора, если они есть
    if (extraItems && extraItems.length > 0) {
      extraItems.forEach(item => {
        // Проверяем, есть ли уже этот товар в корзине
        const cartId = `${item.product.id}-default-default`;
        const existing = items.find(i => `${i.id}-${i.selectedVariation?.size || 'default'}-${i.selectedColor || 'default'}` === cartId);
        
        if (existing) {
          // Если есть, обновляем количество (прибавляем новое)
          updateQuantity(cartId, existing.quantity + item.quantity);
        } else {
          // Если нет, добавляем как новый
          addToCart(item.product, item.quantity);
        }
      });
    }

    setLocalQuantity(q.toString());
    setIsAdded(true);
    
    if (isPanel) {
      setShowUpsell(true);
    }

    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddKit = () => {
    if (mountingKit && mountingKit.bundleItems) {
      // Добавляем ТОЛЬКО содержимое набора
      mountingKit.bundleItems.forEach(item => {
        const fakeProduct: Product = {
          id: item.id,
          name: item.name,
          price: item.price,
          slug: item.slug || "",
          images: [item.image || ""],
          category: "accessories",
          description: "",
          specifications: { material: "", width: 0, height: 0, depth: 0 },
          colors: [],
          variations: [],
          stockCount: 100,
          inStock: true
        };
        addToCart(fakeProduct, item.quantity);
      });
    }
  };

  const handleUpdateKitQty = (newQty: number) => {
    if (mountingKit && mountingKit.bundleItems) {
      // Обновляем количество всех составляющих
      mountingKit.bundleItems.forEach(item => {
        const cartId = `${item.id}-default-default`;
        updateQuantity(cartId, item.quantity * newQty);
      });
    }
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    if (isKitProduct) {
      kitItems.forEach(item => {
        const cartId = `${item.id}-default-default`;
        updateQuantity(cartId, item.quantity * newQty);
      });
    } else {
      updateQuantity(itemId, newQty);
    }
    setLocalQuantity(newQty.toString());
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQty = Math.max(0, quantity - 1);
      if (isKitProduct) {
        kitItems.forEach(item => {
          const cartId = `${item.id}-default-default`;
          updateQuantity(cartId, item.quantity * newQty);
        });
      } else {
        updateQuantity(itemId, newQty);
      }
      setLocalQuantity(newQty.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuantity(e.target.value);
  };

  const handleInputBlur = () => {
    const value = parseInt(localQuantity);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(itemId, value);
      setLocalQuantity(value.toString());
    } else {
      // Если введено некорректное значение, возвращаем старое
      setLocalQuantity(quantity.toString());
    }
  };

  if (quantity > 0) {
    return (
      <div className="space-y-4">
        <div className={`flex items-center border border-slate-900 overflow-hidden bg-white shadow-sm transition-all hover:border-blue-600 ${showIconOnly ? 'w-24 h-12' : 'w-full h-14'}`}>
          <button 
            onClick={handleDecrement}
            className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors group border-r border-slate-100"
            aria-label="Уменьшить количество"
          >
            <Minus className="w-4 h-4 text-slate-900 group-hover:text-blue-600 transition-colors" />
          </button>
          <div className="flex-1 h-full flex items-center justify-center px-2">
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
            className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors group border-l border-slate-100"
            aria-label="Увеличить количество"
          >
            <Plus className="w-4 h-4 text-slate-900 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
        
        {/* Встроенный блок рекомендации */}
        {showUpsell && mountingKit && !showIconOnly && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-blue-50/50 border border-blue-100 p-5 max-w-sm rounded-none">
            <div className="flex items-start gap-4">
              <Link href={`/product/${mountingKit.slug}`} className="w-16 h-16 bg-white flex-shrink-0 overflow-hidden border border-blue-100 hover:border-blue-400 transition-colors rounded-none relative">
                <Image src={mountingKit.images[0]} alt="" fill className="object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">Рекомендуем</p>
                <Link href={`/product/${mountingKit.slug}`} className="hover:text-blue-600 transition-colors">
                  <p className="text-[11px] font-bold uppercase tracking-tight text-slate-900 mb-2 truncate">{mountingKit.name}</p>
                </Link>
                
                {kitQuantity > 0 ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-blue-200 bg-white rounded-none">
                      <button 
                        onClick={() => handleUpdateKitQty(kitQuantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-[10px] font-bold text-slate-900">{kitQuantity}</span>
                      <button 
                        onClick={() => handleUpdateKitQty(kitQuantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-[9px] font-bold uppercase text-green-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Добавлено
                    </span>
                  </div>
                ) : (
                  <button 
                    onClick={handleAddKit}
                    className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:text-blue-600 transition-colors group"
                  >
                    Добавить за {mountingKit.price} ₽ <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showIconOnly) {
    return (
      <div className="relative group/tooltip">
        <Button
          onClick={!inStock ? undefined : handleAdd}
          size="icon"
          variant={!inStock ? "ghost" : "outline"}
          className={`rounded-none w-10 h-10 transition-all duration-300 ${
            !inStock 
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" 
              : "border-slate-200 hover:border-blue-600 hover:text-blue-600 bg-white"
          }`}
          disabled={!inStock}
        >
          {!inStock ? (
            <ShoppingCart className="w-4 h-4 opacity-50" />
          ) : isAdded ? (
            <Check className="w-4 h-4 text-blue-600" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
        </Button>
        {!inStock && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-none whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
            Нет в наличии
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative group/tooltip flex-1">
          <Button 
            onClick={handleAdd}
            disabled={!inStock}
            className={`h-14 px-8 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex-1 w-full rounded-none ${
              !inStock
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                : "bg-slate-900 hover:bg-blue-600 text-white border-transparent shadow-xl shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5"
            }`}
          >
            <ShoppingCart className={`w-4 h-4 mr-3 ${!inStock ? "opacity-50" : ""}`} />
            {!inStock ? "Нет в наличии" : isAdded ? "Добавлено!" : initialQuantity ? `Добавить ${initialQuantity} шт.` : "Добавить в корзину"}
          </Button>
          {!inStock && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-none whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
              Товар временно отсутствует
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
            </div>
          )}
        </div>
      </div>

      {isPanel && inStock && showUpsell && mountingKit && mountingKit.inStock && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-blue-50/50 border border-blue-100 p-5 max-w-sm rounded-none">
          <div className="flex items-start gap-4">
            <Link href={`/product/${mountingKit.slug}`} className="w-16 h-16 bg-white flex-shrink-0 overflow-hidden border border-blue-100 hover:border-blue-400 transition-colors rounded-none relative">
              <Image src={mountingKit.images[0]} alt="" fill className="object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">Рекомендуем</p>
              <Link href={`/product/${mountingKit.slug}`} className="hover:text-blue-600 transition-colors">
                <p className="text-[11px] font-bold uppercase tracking-tight text-slate-900 mb-2 truncate">{mountingKit.name}</p>
              </Link>
              
              {kitQuantity > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-blue-200 bg-white rounded-none">
                    <button 
                      onClick={() => handleUpdateKitQty(kitQuantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-[10px] font-bold text-slate-900">{kitQuantity}</span>
                    <button 
                      onClick={() => handleUpdateKitQty(kitQuantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[9px] font-bold uppercase text-green-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Добавлено
                  </span>
                </div>
              ) : (
                <button 
                  onClick={handleAddKit}
                  className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:text-blue-600 transition-colors group"
                >
                  Добавить за {mountingKit.price} ₽ <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
