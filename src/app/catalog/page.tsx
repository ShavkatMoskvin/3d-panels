"use client";

import { useState } from "react";
import { Category } from "@/types";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import Image from "next/image";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0].value);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = product.category === activeCategory;
    return matchesCategory && !product.isHidden && product.inStock;
  });

  return (
    <div className="bg-white min-h-screen hide-scrollbar">
      {/* Catalog Header */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="Catalog Background" 
            fill
            className="object-cover brightness-[0.4] scale-105" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-white/40"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/60">
              Premium Wall Decor
            </span>
            <div className="h-[1px] w-8 bg-white/40"></div>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold mb-10 uppercase tracking-tighter text-white leading-none">
            Каталог <br /> <span className="font-light italic text-white/30 text-5xl md:text-7xl">избранного</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto uppercase text-[10px] font-medium tracking-[0.3em] leading-relaxed">
            Архитектурные решения для тех, кто ценит эстетику и качество в каждой детали своего пространства.
          </p>
        </div>
      </section>

      {/* Основной контейнер каталога */}
      <div className="relative pb-20">
        <div className="w-full py-6 md:py-10">
          <div className="max-w-[1400px] w-full mx-auto bg-white/50 backdrop-blur-sm border-b border-slate-100/50 py-2">
            <div className="container mx-auto px-2 md:px-4">
              <div className="flex flex-col items-center">
                {/* Категории - Адаптивная сетка для мобильных */}
                <div className="w-full">
                  <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`relative px-4 md:px-8 py-3 md:py-4 transition-all duration-300 rounded-xl flex items-center justify-center text-center ${
                          activeCategory === cat.value 
                            ? "text-white bg-slate-900 shadow-lg shadow-slate-900/20" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 bg-slate-50 md:bg-transparent"
                        } text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]`}
                      >
                        <span className="relative z-10">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Счетчик товаров */}
                <div className="mt-4 md:mt-6 opacity-100">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-4 bg-slate-200"></div>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                      {filteredProducts.length} моделей в коллекции
                    </p>
                    <div className="h-px w-4 bg-slate-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative bg-slate-50 border border-slate-100 p-6 transition-all hover:bg-white hover:shadow-2xl flex flex-col">
                  <Link href={`/product/${product.slug}`} className={`relative block aspect-square bg-white overflow-hidden mb-6 border border-slate-100 transition-all duration-500 ${!product.inStock ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 font-light italic tracking-widest uppercase p-8 text-center">
                        {product.name}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <span className="bg-slate-900/90 text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 backdrop-blur-sm">
                          Нет в наличии
                        </span>
                      </div>
                    )}
                  </Link>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
                          {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                        </span>
                        <span className="text-xs font-bold tracking-tighter text-slate-900 whitespace-nowrap">
                          {product.variations && product.variations.length > 0 
                            ? `от ${Math.min(...product.variations.map(v => v.price))} ₽` 
                            : `${product.price} ₽`}
                        </span>
                      </div>
                      <Link href={`/product/${product.slug}`}>
                        <h4 className="text-xs font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors leading-tight min-h-[2.5rem] line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                    </div>
                    
                    <div className="mt-auto">
                      <Link href={`/product/${product.slug}`} className="block">
                        <button className="w-full py-3.5 bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                          Подробнее
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="py-40 text-center">
                <p className="text-slate-400 uppercase text-[10px] tracking-[0.5em]">Коллекций не найдено</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
