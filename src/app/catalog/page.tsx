"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types";
import { AddToCart } from "@/components/AddToCart";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>("all");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Проверяем, проскроллили ли мы за пределы шапки каталога
      // Высота шапки примерно 400-500px
      if (window.scrollY > 450) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Catalog Header */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="Catalog Background" 
            className="w-full h-full object-cover brightness-[0.4] scale-105" 
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

      {/* Filter Bar */}
      <div className={`sticky top-[80px] bg-white/80 backdrop-blur-xl z-40 border-b border-slate-100 transition-all duration-300 ${
        isSticky ? "py-4" : "py-8"
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center gap-x-8 gap-y-4 transition-all duration-300 ${
            isSticky 
              ? "overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center" 
              : "flex-wrap justify-center"
          }`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`group relative py-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-all whitespace-nowrap ${
                  activeCategory === cat.value ? "text-blue-600" : "text-slate-400 hover:text-slate-900"
                } ${isSticky ? "flex-shrink-0" : ""}`}
              >
                {cat.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                  activeCategory === cat.value ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Показано: {filteredProducts.length} моделей
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-slate-50 overflow-hidden mb-8 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 font-light italic tracking-widest group-hover:scale-110 transition-transform duration-700 uppercase p-8 text-center">
                      {product.name}
                    </div>
                  )}
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
                        {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                      </span>
                      <span className="text-sm font-bold tracking-tighter text-slate-900">
                        {product.price} ₽
                      </span>
                    </div>
                    <Link href={`/product/${product.slug}`}>
                      <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors leading-tight">
                        {product.name}
                      </h4>
                    </Link>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
