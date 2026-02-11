"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowLeft, Minus, Plus } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, includeInstallation, setIncludeInstallation, installationPrice } = useCart();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const itemsPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const getItemId = (item: any) => {
    return `${item.id}-${item.selectedVariation?.size || 'default'}-${item.selectedColor || 'default'}`;
  };

  const handleClearCart = () => {
    if (isConfirmingClear) {
      clearCart();
      setIsConfirmingClear(false);
    } else {
      setIsConfirmingClear(true);
      setTimeout(() => setIsConfirmingClear(false), 3000);
    }
  };

  // Компонент для управления количеством внутри строки корзины
  const QuantitySelector = ({ item, itemId }: { item: any, itemId: string }) => {
    const [localQty, setLocalQty] = useState<string>(item.quantity.toString());

    useEffect(() => {
      setLocalQty(item.quantity.toString());
    }, [item.quantity]);

    const handleBlur = () => {
      const val = parseInt(localQty);
      if (!isNaN(val) && val >= 0) {
        updateQuantity(itemId, val);
        setLocalQty(val.toString());
      } else {
        setLocalQty(item.quantity.toString());
      }
    };

    return (
      <div className="flex items-center border border-slate-200 bg-white group hover:border-blue-600 transition-colors w-fit">
        <button 
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
          onClick={() => updateQuantity(itemId, item.quantity - 1)}
        >
          <Minus size={14} className="sm:hidden" />
          <Minus size={16} className="hidden sm:block" />
        </button>
        <div className="flex items-center border-x border-slate-100 px-2 h-10 sm:h-12">
          <input 
            type="number"
            value={localQty}
            onChange={(e) => setLocalQty(e.target.value)}
            onBlur={handleBlur}
            className="w-10 sm:w-12 text-center font-bold text-sm sm:text-base outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="0"
          />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 select-none ml-1">шт.</span>
        </div>
        <button 
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
          onClick={() => updateQuantity(itemId, item.quantity + 1)}
        >
          <Plus size={14} className="sm:hidden" />
          <Plus size={16} className="hidden sm:block" />
        </button>
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">Корзина пуста</h1>
        <p className="text-slate-400 uppercase text-xs tracking-[0.3em] mb-12">Ваш выбор пока пуст. Начните с каталога.</p>
        <Link href="/catalog">
          <Button size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 block">
            Your Selection
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter">
            Корзина <span className="font-light italic text-slate-300">товаров</span>
          </h1>
          
          <button 
            onClick={handleClearCart}
            className={`mt-4 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
              isConfirmingClear 
                ? "bg-red-600 border-red-600 text-white" 
                : "bg-transparent border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-500"
            }`}
          >
            {isConfirmingClear ? "Вы уверены? (Нажмите еще раз)" : "Очистить корзину"}
          </button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            {items.map((item) => {
              const currentItemId = getItemId(item);
              return (
                <div key={currentItemId} className="flex gap-4 sm:gap-8 border-b border-slate-100 pb-8 md:pb-12 group relative">
                  {/* Image */}
                  <Link 
                    href={`/product/${item.slug}`}
                    className="w-24 h-24 sm:w-48 sm:h-48 flex-shrink-0 bg-slate-50 relative overflow-hidden border border-slate-100 group-hover:bg-slate-100 transition-colors"
                  >
                    {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-400 text-center px-2">
                        {item.name}
                      </div>
                    )}
                  </Link>
                  
                  {/* Info & Controls */}
                  <div className="flex flex-col flex-1 min-w-0 py-1">
                    {/* Top Row: Category & Title & Delete(Mobile) */}
                    <div className="flex justify-between items-start mb-auto">
                      <div className="min-w-0 pr-2">
                        <span className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-1 sm:mb-2 block truncate">
                          {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                        </span>
                        <Link href={`/product/${item.slug}`} className="hover:text-blue-600 transition-colors">
                          <h3 className="text-sm sm:text-xl font-bold uppercase tracking-tight mb-1 truncate leading-tight">{item.name}</h3>
                        </Link>
                        {item.selectedVariation && (
                          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                            Размер: {item.selectedVariation.size}
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                            Цвет: {item.selectedColor}
                          </p>
                        )}
                        {item.kitItems && (
                          <div className="mt-2 mb-2">
                            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Состав набора:</p>
                            <div className="space-y-1">
                              {item.kitItems.map((ki: any) => ki.quantity > 0 && (
                                <div key={ki.id} className="text-[9px] sm:text-[10px] text-slate-500 flex justify-between gap-4">
                                  <Link href={ki.slug ? `/product/${ki.slug}` : "#"} className={`truncate ${ki.slug ? 'hover:text-blue-600 transition-colors' : ''}`}>
                                    {ki.name}
                                  </Link>
                                  <span className="flex-shrink-0 font-bold">{ki.quantity} шт.</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className="text-[10px] sm:text-sm text-slate-400 uppercase tracking-widest font-medium">
                          {item.price} ₽ / {item.category === 'flexible-stone' ? 'кв.м.' : 'шт.'}
                        </p>
                      </div>
                      
                      <button 
                        className="sm:hidden text-slate-300 hover:text-red-500 transition-colors p-1 -mr-2"
                        onClick={() => removeFromCart(currentItemId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Bottom: Quantity & Total */}
                    <div className="flex items-end justify-between gap-2 mt-4">
                      <div className="flex-shrink-0">
                        <QuantitySelector 
                          item={item} 
                          itemId={currentItemId} 
                        />
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 leading-none mb-1">
                          {item.price * item.quantity} ₽
                        </div>
                        <div className="sm:hidden text-[8px] font-bold uppercase tracking-widest text-slate-300">
                          Итого
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Delete (hidden on mobile) */}
                  <button 
                    className="hidden sm:flex text-slate-200 hover:text-red-500 transition-colors p-2 self-start mt-2"
                    onClick={() => removeFromCart(currentItemId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="lg:col-span-4">
            <div className="border border-slate-900 p-6 md:p-10 sticky top-32 bg-white">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-8 md:mb-10">Итого</h3>
              
              {/* Installation Upsell */}
              <div className="mb-8 md:mb-10 p-5 md:p-6 bg-slate-50 border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Монтаж панелей</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="installation"
                      checked={includeInstallation}
                      onChange={(e) => setIncludeInstallation(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
                  Профессиональный монтаж нашими мастерами с гарантией 2 года (+15% к стоимости)
                </p>
              </div>

              <div className="space-y-4 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-slate-100">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-400">
                  <span>Товары ({items.length})</span>
                  <span className="font-bold text-slate-900">{itemsPrice} ₽</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-blue-600 font-bold">
                    <span>Монтаж (15%)</span>
                    <span>{installationPrice} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-400">
                  <span>Доставка</span>
                  <span className="text-green-600 font-bold">Бесплатно</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-3xl md:text-2xl uppercase tracking-tighter mb-8 md:mb-10">
                <span>Всего</span>
                <span>{totalPrice} ₽</span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full rounded-none py-10 uppercase tracking-[0.3em] text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-2xl shadow-blue-200 border-none" size="lg">
                  Оформить заказ
                </Button>
              </Link>
              
              <p className="mt-8 text-[9px] text-slate-400 uppercase tracking-widest text-center leading-relaxed">
                Безопасная оплата картой или наличными <br /> при получении товара
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
