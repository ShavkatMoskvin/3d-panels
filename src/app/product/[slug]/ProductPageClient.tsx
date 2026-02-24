"use client";

import { Calculator } from "@/components/Calculator";
import { AddToCart } from "@/components/AddToCart";
import { ArrowLeft, Check, Truck, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "@/components/ProductImage";
import { EcoPassport } from "@/components/EcoPassport";

export default function ProductPageClient({ product }: { product: Product }) {
  const router = useRouter();
  const { items } = useCart();
  const [mainImage, setMainImage] = useState(product.images[0] || "");
  const [mainQuantity, setMainQuantity] = useState<number>(1);
  const [extraCalculatedItems, setExtraCalculatedItems] = useState<{ product: Product, quantity: number }[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(product.variations?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [kitItems, setKitItems] = useState(product.bundleItems || []);

  // Синхронизация количества с корзиной при загрузке или изменении корзины
  useEffect(() => {
    const cartItem = items.find(item => 
      item.id === product.id && 
      item.selectedVariation?.size === selectedVariation?.size &&
      (item.selectedColor === (selectedColor?.name || undefined) || item.selectedColor === selectedColor?.name)
    );
    
    if (cartItem && cartItem.quantity !== mainQuantity) {
      setMainQuantity(cartItem.quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, product.id, selectedVariation, selectedColor]); // mainQuantity исключен для предотвращения циклов

  // Проверка наличия выбранного цвета
  const isSelectedColorInStock = useMemo(() => {
    if (!selectedColor) return product.inStock;
    return selectedColor.inStock;
  }, [selectedColor, product]);

  // Если это монтажный комплект, разделяем его на составляющие для отображения в "Составе набора"
  // Но по запросу пользователя "Набор почему идет как один товар а не как несколько по отдельности, отдели"
  // Мы будем добавлять каждый товар набора отдельно в корзину.

  // Синхронизация количества с AddToCart
  const handleCalculate = (q: number, extras?: { product: Product, quantity: number }[]) => {
    // Мы обновляем количество только если оно еще не было изменено пользователем вручную
    // или если это первый расчет.
    // Но по умолчанию калькулятор должен предлагать, а пользователь — решать.
    setMainQuantity(q);
    if (extras) {
      setExtraCalculatedItems(extras);
    }
  };

  // Рассчитываем отображаемую цену за единицу (с учетом вариации)
  const currentPrice = selectedVariation ? selectedVariation.price : product.price;

  const handleVariationChange = (v: { size: string; price: number }) => {
    setSelectedVariation(v);
    setMainQuantity(1); // Сброс количества при смене размера
    setExtraCalculatedItems([]); // Сброс расходников
  };

  const handleColorChange = (c: NonNullable<Product['colors']>[number]) => {
    setSelectedColor(c);
    // При смене цвета обновляем главное изображение, если оно есть у цвета
    if (c.image) {
      setMainImage(c.image);
    }
  };

  const handleKitItemQuantityChange = (itemId: string, delta: number) => {
    setKitItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Умная логика рекомендаций "Покупают вместе"
  const getSuggestedProducts = () => {
    const suggestions: Product[] = [];
    
    // 1. Если это панель, обязательно предлагаем монтажный комплект
    const isMainPanel = ['gypsum', 'flexible-stone', 'travertine'].includes(product.category);
    if (isMainPanel) {
      const mountingKit = PRODUCTS.find(p => p.slug === 'mounting-kit-pro' && p.inStock);
      if (mountingKit) suggestions.push(mountingKit);
    }

    // 2. Добавляем профили и аксессуары, исключая текущий товар и уже добавленные
    const others = PRODUCTS.filter(p => 
      !p.isHidden &&
      p.inStock &&
      p.id !== product.id && 
      !suggestions.find(s => s.id === p.id) &&
      (p.category === 'profiles' || p.category === 'accessories')
    );

    // Перемешиваем и берем столько, чтобы в сумме было 3
    return [...suggestions, ...others].slice(0, 3);
  };

  const suggestedProducts = getSuggestedProducts();
  
  const isPanel = ['gypsum', 'flexible-stone', 'travertine'].includes(product.category);
  const isProfile = product.category === 'profiles';

  return (
    <div className="bg-white min-h-screen">
      {/* Product Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
            alt="Product Interior Background" 
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад в каталог
          </button>
          
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400 mb-4 block">
              {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
              {product.name}
            </h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              {isPanel ? "Premium Quality Wall Panels" : "Professional Quality Materials"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Left Column: Images */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-slate-50 border border-slate-100 relative overflow-hidden group">
              <ProductImage 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full"
              />
              <div className="absolute inset-0 image-overlay-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  className={`aspect-square bg-slate-50 border cursor-pointer hover:bg-slate-100 transition-all overflow-hidden group/thumb flex items-center justify-center ${
                    mainImage === img ? "border-blue-600 ring-2 ring-blue-600/20" : "border-slate-100"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <ProductImage 
                    src={img} 
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Product Features Section */}
            <div className="mt-20 pt-20 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-12">Характеристики и преимущества</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2">Экологичность</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-widest">Безопасные материалы высшего качества, подходящие для жилых помещений.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2">Быстрая доставка</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-widest">Доставим ваш заказ в кратчайшие сроки по Пензе и области.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco Passport */}
            {product.ecoDetails && (
              <EcoPassport details={product.ecoDetails} />
            )}
          </div>

          {/* Right Column: Info & Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-slate-900 uppercase mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-bold tracking-tighter text-slate-900">
                    {currentPrice.toLocaleString()} ₽ 
                    <span className="text-[10px] font-bold text-slate-400 ml-4 uppercase tracking-[0.2em]">за 1 шт.</span>
                  </p>
                  {(!isSelectedColorInStock) && (
                    <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-red-100">
                      Нет в наличии
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-slate-500 uppercase text-[11px] font-medium tracking-widest leading-loose">
                  {product.description}
                </p>
              </div>

              {/* Размер материалов */}
              {(isPanel || (product.variations && product.variations.length > 0)) && (
                <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Выберите размер</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.variations && product.variations.length > 0 ? (
                          product.variations.map((v) => (
                            <button
                              key={v.size}
                              onClick={() => handleVariationChange(v)}
                              className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                selectedVariation?.size === v.size
                                  ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10"
                                  : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
                              }`}
                            >
                              {v.size}
                            </button>
                          ))
                        ) : (
                          <button
                            className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 cursor-default"
                          >
                            {product.specifications?.width && product.specifications?.height 
                              ? `${product.specifications.width} x ${product.specifications.height} мм`
                              : "Стандартный"}
                          </button>
                        )}
                      </div>
                </div>
              )}
              {/* Цвет */}
              {(isPanel || (product.colors && product.colors.length > 0)) && (
                <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest mt-12  text-slate-400 mb-4">Выберите цвет</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.colors && product.colors.length > 0 ? (
                          product.colors.map((c) => {
                            const isColorInStock = c.inStock;
                            
                            return (
                              <button
                                key={c.name}
                                onClick={() => handleColorChange(c)}
                                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 relative ${
                                  selectedColor?.name === c.name
                                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10"
                                    : isColorInStock
                                      ? "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
                                      : "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                                }`}
                              >
                                <span className="relative z-10">{c.name}</span>
                                {!isColorInStock && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1px] bg-slate-200 rotate-[15deg]"></div>
                                  </div>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <button
                            className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 cursor-default"
                          >
                            <span className="relative z-10">Базовый цвет</span>
                          </button>
                        )}
                      </div>
                </div>
              )}
              {isPanel && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-12 pb-12 pt-12 border-b border-slate-100">
                  <div className="p-4 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl sm:rounded-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Материал</span>
                    <p className="text-sm font-bold uppercase tracking-tight">
                      {product.specifications.material}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Calculator & Purchase Section - MOVED BELOW */}
              {isPanel && !isSelectedColorInStock && (
                <div className="mb-12">
                  <div className="p-6 bg-red-50/50 border border-red-100 rounded-xl">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-red-600 leading-relaxed mb-6">
                      Этот цвет временно недоступен для заказа. Пожалуйста, выберите другой вариант из списка доступных.
                    </p>
                    <AddToCart 
                      product={{
                        ...product,
                        inStock: false
                      }} 
                      selectedVariation={selectedVariation || undefined}
                      selectedColor={selectedColor?.name || undefined}
                      kitItems={kitItems}
                      initialQuantity={mainQuantity}
                      extraItems={extraCalculatedItems}
                    />
                  </div>
                </div>
              )}

              {isPanel && isSelectedColorInStock && (
                <div className="mb-12 space-y-6">
                  <div className="p-6 bg-blue-50/30 border border-blue-100 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2">Быстрый заказ</p>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-relaxed mb-6">
                      Укажите количество вручную или используйте <a href="#calculator" className="text-blue-600 underline underline-offset-4 hover:text-blue-700">интерактивный калькулятор</a> ниже для точного расчета по размерам стены.
                    </p>
                    <AddToCart 
                      product={{
                        ...product,
                        inStock: isSelectedColorInStock
                      }} 
                      selectedVariation={selectedVariation || undefined}
                      selectedColor={selectedColor?.name || undefined}
                      kitItems={kitItems}
                      initialQuantity={mainQuantity}
                      extraItems={extraCalculatedItems}
                    />
                  </div>
                </div>
              )}

              {/* Main AddToCart - Виден только если это НЕ панель */}
              {!isPanel && (
                <div className="mb-12 flex justify-end">
                  <div className="w-full md:w-[400px]">
                    <AddToCart 
                      product={{
                        ...product,
                        inStock: isSelectedColorInStock
                      }} 
                      selectedVariation={selectedVariation || undefined}
                      selectedColor={selectedColor?.name || undefined}
                      kitItems={kitItems}
                      initialQuantity={mainQuantity}
                      extraItems={extraCalculatedItems}
                    />
                  </div>
                </div>
              )}
              {kitItems.length > 0 && (
                <div className="mb-12 p-8 bg-slate-50 border border-slate-100 rounded-2xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Состав набора</h4>
                  <div className="space-y-6">
                    {kitItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm group/item">
                        <Link href={item.slug ? `/product/${item.slug}` : "#"} className={`w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-50 relative flex items-center justify-center ${item.slug ? 'cursor-pointer' : 'cursor-default'}`}>
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover/item:scale-110" />
                          ) : (
                            <div className="p-2 text-center">
                              <p className="text-[7px] font-bold uppercase tracking-tighter text-slate-300 leading-tight">
                                {item.name}
                              </p>
                            </div>
                          )}
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={item.slug ? `/product/${item.slug}` : "#"}>
                            <h5 className={`text-[11px] font-bold uppercase tracking-tight mb-1 truncate ${item.slug ? 'hover:text-blue-600 transition-colors cursor-pointer' : 'cursor-default'}`}>
                              {item.name}
                            </h5>
                          </Link>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tighter">{item.price} ₽ / шт.</p>
                        </div>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-10">
                          <button 
                            onClick={() => handleKitItemQuantityChange(item.id, -1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div className="w-10 h-full flex items-center justify-center text-[11px] font-bold border-x border-slate-200 bg-slate-50/30">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => handleKitItemQuantityChange(item.id, 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Итого за набор:</span>
                    <span className="text-xl font-bold tracking-tighter">{currentPrice} ₽</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-8 border-t border-slate-100">
                {isSelectedColorInStock && (
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <Check className="w-3 h-3 text-green-500 mr-3" />
                    В наличии в Пензе
                  </div>
                )}
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <Truck className="w-3 h-3 text-blue-600 mr-3" />
                  {isSelectedColorInStock ? "Доставка по области 1-3 дня" : "Доставка под заказ 7-14 дней"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Planning Section - New Full Width Section for Panels */}
        {isPanel && isSelectedColorInStock && (
          <section id="calculator" className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex flex-col mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4">Мастер планирования</span>
              <h3 className="text-3xl font-bold uppercase tracking-tighter">Расчет материалов и раскладка</h3>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-4 max-w-2xl leading-loose">
                Используйте наш профессиональный инструмент для точного расчета. Укажите размеры стен, выберите раскладку и исключите лишние участки. Результат будет автоматически добавлен в корзину.
              </p>
            </div>
            
            <Calculator 
              product={product} 
              selectedVariation={selectedVariation || undefined}
              selectedColor={selectedColor?.name || undefined}
              onCalculate={handleCalculate}
              extraItems={extraCalculatedItems}
              quantity={mainQuantity}
            >
              <div className="mt-6 flex md:justify-end justify-center">
                <div className="w-full md:w-[400px]">
                  <AddToCart 
                    product={{
                      ...product,
                      inStock: isSelectedColorInStock
                    }} 
                    selectedVariation={selectedVariation || undefined}
                    selectedColor={selectedColor?.name || undefined}
                    kitItems={kitItems}
                    initialQuantity={mainQuantity}
                    extraItems={extraCalculatedItems}
                    hideUpsell={true}
                  />
                </div>
              </div>
            </Calculator>
          </section>
        )}
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
                  <div className="aspect-square mb-6 overflow-hidden bg-white relative">
                    <ProductImage 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
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
                    <div className="pt-4 flex items-center justify-between gap-4">
                      <Link href={`/product/${item.slug}`} className="w-full">
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
