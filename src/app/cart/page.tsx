"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, includeInstallation, setIncludeInstallation, installationPrice } = useCart();
  const itemsPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

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
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-12">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-8 border-b border-slate-100 pb-12 items-center group">
                <div className="w-full sm:w-48 aspect-square bg-slate-50 relative overflow-hidden border border-slate-100 group-hover:bg-slate-100 transition-colors">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-slate-400">
                      {item.name}
                    </div>
                  )}
                  <div className="absolute inset-0 image-overlay-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 block">
                    {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-400 uppercase tracking-widest">{item.price} ₽ / шт.</p>
                </div>
                
                <div className="flex items-center gap-6 border border-slate-200 px-4 py-2">
                  <button 
                    className="text-slate-400 hover:text-black transition-colors px-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    —
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button 
                    className="text-slate-400 hover:text-black transition-colors px-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-xl font-bold tracking-tight w-32 text-center sm:text-right">
                  {item.price * item.quantity} ₽
                </div>
                
                <button 
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-4">
            <div className="border border-slate-900 p-10 sticky top-32">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-10">Итого</h3>
              
              {/* Installation Upsell */}
              <div className="mb-10 p-6 bg-slate-50 border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Монтаж панелей</span>
                  <input 
                    type="checkbox" 
                    id="installation"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
                  Профессиональный монтаж нашими мастерами с гарантией 2 года (+15% к стоимости)
                </p>
              </div>

              <div className="space-y-4 mb-10 pb-10 border-b border-slate-100">
                <div className="flex justify-between text-xs uppercase tracking-widest text-slate-400">
                  <span>Товары ({items.length})</span>
                  <span>{itemsPrice} ₽</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-xs uppercase tracking-widest text-blue-600 font-medium">
                    <span>Монтаж (15%)</span>
                    <span>{installationPrice} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-xs uppercase tracking-widest text-slate-400">
                  <span>Доставка</span>
                  <span className="text-green-600 font-bold">Бесплатно</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-2xl uppercase tracking-tighter mb-10">
                <span>Всего</span>
                <span>{totalPrice} ₽</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full rounded-none py-8 uppercase tracking-widest text-xs" size="lg">
                  Оформить заказ
                </Button>
              </Link>
              
              <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с условиями <br /> обработки персональных данных.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
