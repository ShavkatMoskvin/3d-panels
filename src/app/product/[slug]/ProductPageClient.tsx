"use client";

import { Calculator } from "@/components/Calculator";
import { AddToCart } from "@/components/AddToCart";
import { ArrowLeft, Check, Truck, Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useState } from "react";

export default function ProductPageClient({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState(product.images[0] || "");
  const [calculatedQuantity, setCalculatedQuantity] = useState<number | null>(null);

  // Фильтруем профили и аксессуары для секции "Покупают вместе"
  const suggestedProducts = PRODUCTS.filter(p => 
    (p.category === 'profiles' || p.category === 'accessories') && p.id !== product.id
  ).slice(0, 3);
  
  const isPanel = ['gypsum', 'polyurethane', 'slatted', 'flexible-stone', 'hd-spc', 'travertine'].includes(product.category);
  const isProfile = product.category === 'profiles';

  return (
    <div className="bg-white min-h-screen">
      {/* Product Hero Background */}
      <div className="relative h-64 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/{7D2B5115-6E0A-4EFB-80D5-CC21ED300691}.png" 
            alt="Product Background" 
            className="w-full h-full object-cover brightness-[0.6]" 
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <Link href="/catalog" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3 mr-2" />
            Назад в каталог
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Images */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
              {mainImage ? (
                <>
                  <img 
                    src={mainImage} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 image-overlay-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 font-light italic tracking-[0.5em] uppercase p-20 text-center">
                  High Resolution Image: {product.name}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`aspect-square bg-slate-50 border cursor-pointer hover:bg-slate-100 transition-all overflow-hidden ${
                    mainImage === img ? "border-blue-600 ring-1 ring-blue-600" : "border-slate-100"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${i + 1}`}
                    className={`w-full h-full object-cover transition-opacity ${
                      mainImage === img ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
                {product.name}
              </h1>
              <p className="text-3xl font-bold tracking-tighter mb-10">
                {product.price} ₽ <span className="text-sm font-normal text-slate-400 ml-2 uppercase tracking-widest">за шт.</span>
              </p>

              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-slate-500 uppercase text-[11px] tracking-widest leading-loose">
                  {product.description}
                </p>
              </div>

              {isPanel && (
                <div className="grid grid-cols-2 gap-10 mb-12 pb-12 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Размер</span>
                    <p className="text-sm font-bold uppercase tracking-tight">
                      {product.specifications.width} x {product.specifications.height} мм
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Материал</span>
                    <p className="text-sm font-bold uppercase tracking-tight">
                      {product.specifications.material}
                    </p>
                  </div>
                </div>
              )}

              {/* Calculator Section */}
              {isPanel && (
                <div className="mb-12">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Расчет количества</h4>
                  <Calculator 
                    product={product} 
                    onCalculate={(q) => setCalculatedQuantity(q)} 
                  />
                </div>
              )}

              <div className="flex flex-col gap-6 mb-12">
                <AddToCart 
                  product={product} 
                  initialQuantity={calculatedQuantity || undefined} 
                />
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-100">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <Check className="w-3 h-3 text-green-500 mr-3" />
                  В наличии в Пензе
                </div>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <Truck className="w-3 h-3 text-blue-600 mr-3" />
                  Доставка по области 1-3 дня
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bought Together Section */}
        {!isProfile && suggestedProducts.length > 0 && (
          <section className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex flex-col mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4">Дополните ваш интерьер</span>
              <h3 className="text-3xl font-bold uppercase tracking-tighter">Покупают вместе</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestedProducts.map((item) => (
                <div key={item.id} className="group relative bg-slate-50 border border-slate-100 p-6 transition-all hover:bg-white hover:shadow-2xl">
                  <div className="aspect-square mb-6 overflow-hidden bg-white">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest leading-tight flex-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold tracking-tighter whitespace-nowrap">
                        {item.price} ₽
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-6">
                      {item.specifications.material}
                    </p>
                    <div className="pt-4">
                      <Link href={`/product/${item.slug}`}>
                        <button className="w-full py-4 bg-white border border-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                          Подробнее
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
