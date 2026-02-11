"use client";

import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { AddToCart } from "@/components/AddToCart";
import Link from "next/link";

export default function UIKitPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].value);
  const demoProduct = PRODUCTS[0];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="bg-slate-900 py-24 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-4">
            Design System <span className="font-light italic text-white/40">v1.0</span>
          </h1>
          <p className="text-white/50 uppercase text-[10px] font-medium tracking-[0.3em]">
            Библиотека компонентов и стилей проекта 3D Panels
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-24">
        {/* Typography & Colors */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl font-bold uppercase tracking-widest">01. Typography & Colors</h2>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Heading Large</p>
                <h3 className="text-6xl font-bold uppercase tracking-tighter">Premium Design</h3>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Heading Medium</p>
                <h3 className="text-2xl font-bold uppercase tracking-widest">Collection 2024</h3>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Accent Text</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">Premium Wall Decor</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="aspect-square bg-slate-900 rounded-2xl shadow-lg"></div>
                <p className="text-[10px] font-bold text-center uppercase">Slate 900</p>
              </div>
              <div className="space-y-2">
                <div className="aspect-square bg-blue-600 rounded-2xl shadow-lg"></div>
                <p className="text-[10px] font-bold text-center uppercase">Blue 600</p>
              </div>
              <div className="space-y-2">
                <div className="aspect-square bg-slate-100 rounded-2xl shadow-lg"></div>
                <p className="text-[10px] font-bold text-center uppercase">Slate 100</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl font-bold uppercase tracking-widest">02. Interactive Elements</h2>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Primary Button (Dark)</p>
              <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                Оплатить заказ
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Secondary Button (Outline)</p>
              <button className="w-full py-4 bg-white border border-slate-900 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                Подробнее
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Add to Cart Component</p>
              <AddToCart product={demoProduct} />
            </div>
          </div>
        </section>

        {/* Navigation / Category Pill */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl font-bold uppercase tracking-widest">03. Navigation Style</h2>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl flex justify-center">
            <div className="inline-flex p-1 bg-white shadow-sm rounded-2xl gap-2 border border-slate-100">
              {CATEGORIES.slice(0, 3).map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-xl whitespace-nowrap ${
                    activeCategory === cat.value 
                      ? "text-slate-900 shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {activeCategory === cat.value && (
                    <div className="absolute inset-0 bg-slate-100 rounded-xl z-0" />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl font-bold uppercase tracking-widest">04. Product Card Design</h2>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="group relative bg-slate-50 border border-slate-100 p-6 transition-all hover:bg-white hover:shadow-2xl flex flex-col">
              <div className="relative block aspect-square bg-white overflow-hidden mb-6 border border-slate-100 transition-all duration-500">
                <img 
                  src={demoProduct.images?.[0]} 
                  alt={demoProduct.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
                      {CATEGORIES.find(c => c.value === demoProduct.category)?.label}
                    </span>
                    <span className="text-xs font-bold tracking-tighter text-slate-900 whitespace-nowrap">
                      {demoProduct.price} ₽
                    </span>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors leading-tight min-h-[2.5rem] line-clamp-2">
                    {demoProduct.name}
                  </h4>
                </div>
                
                <div className="mt-auto pt-4">
                  <button className="w-full py-4 bg-white border border-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
