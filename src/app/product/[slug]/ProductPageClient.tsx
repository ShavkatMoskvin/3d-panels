"use client";

import { Calculator } from "@/components/Calculator";
import { AddToCart } from "@/components/AddToCart";
import { ArrowLeft, Check, Truck, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useState, useMemo } from "react";

export default function ProductPageClient({ product }: { product: Product }) {
  const router = useRouter();
  const [mainImage, setMainImage] = useState(product.images[0] || "");
  const [mainQuantity, setMainQuantity] = useState<number>(1);
  const [extraCalculatedItems, setExtraCalculatedItems] = useState<{ product: Product, quantity: number }[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(product.variations?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [kitItems, setKitItems] = useState(product.bundleItems || []);

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
    setMainQuantity(q);
    if (extras) {
      setExtraCalculatedItems(extras);
    }
  };

  // Рассчитываем отображаемую цену за единицу (с учетом вариации)
  const currentPrice = selectedVariation ? selectedVariation.price : product.price;

  // Общая стоимость комплекта (если есть kitItems)
  const bundleTotalPrice = kitItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const baseUnitPrice = currentPrice + bundleTotalPrice;

  // Итоговая стоимость всего набора (панели + расходники)
  const extrasTotal = extraCalculatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalOrderPrice = (baseUnitPrice * mainQuantity) + extrasTotal;

  const handleVariationChange = (v: { size: string; price: number }) => {
    setSelectedVariation(v);
    setMainQuantity(1); // Сброс количества при смене размера
    setExtraCalculatedItems([]); // Сброс расходников
  };

  const handleColorChange = (c: { name: string; inStock: boolean; image?: string }) => {
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
      {/* Product Hero Background */}
      <div className="relative h-64 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/{7D2B5115-6E0A-4EFB-80D5-CC21ED300691}.png" 
            alt="Product Background" 
            fill
            className="object-cover brightness-[0.6]" 
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Назад
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Images */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
              {mainImage ? (
                <>
                  <Image 
                    src={mainImage} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <div className="relative w-full h-full">
                    <Image 
                      src={img} 
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className={`object-cover transition-opacity ${
                        mainImage === img ? "opacity-100" : "opacity-50 hover:opacity-100"
                      }`}
                    />
                  </div>
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
              <div className="flex items-center gap-4 mb-10">
                <p className="text-3xl font-bold tracking-tighter">
                  {totalOrderPrice.toLocaleString()} ₽ {mainQuantity > 1 && <span className="text-sm font-normal text-slate-400 ml-2 uppercase tracking-widest">итого</span>}
                </p>
                {(!isSelectedColorInStock) && (
                  <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-red-100">
                    Нет в наличии
                  </span>
                )}
              </div>

              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-slate-500 uppercase text-[11px] tracking-widest leading-loose">
                  {product.description}
                </p>
              </div>

              {product.variations && (
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Выберите размер</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => handleVariationChange(v)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          selectedVariation?.size === v.size
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Выберите цвет</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isColorInStock = c.inStock;
                      
                      return (
                        <button
                          key={c.name}
                          onClick={() => handleColorChange(c)}
                          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all relative ${
                            selectedColor?.name === c.name
                              ? "bg-slate-900 text-white border-slate-900"
                              : isColorInStock
                                ? "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
                                : "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                          }`}
                        >
                          {c.name}
                          {!isColorInStock && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-[1px] bg-slate-300 rotate-[15deg]"></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                <div className="mb-12">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Расчет количества</h4>
                  <Calculator 
                    product={product} 
                    selectedVariation={selectedVariation || undefined}
                    onCalculate={handleCalculate} 
                    extraItems={extraCalculatedItems}
                  />
                  
                  <div className="mt-8">
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

              {/* Расходники вне калькулятора - Убрано по требованию */}
              
              {/* Main AddToCart - Синхронизирован с калькулятором */}
              {!isPanel && (
                <div className="mb-12">
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
              )}
              {kitItems.length > 0 && (
                <div className="mb-12 p-8 bg-slate-50 border border-slate-100 rounded-2xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Состав набора</h4>
                  <div className="space-y-6">
                    {kitItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm group/item">
                        <Link href={item.slug ? `/product/${item.slug}` : "#"} className={`w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-50 relative ${item.slug ? 'cursor-pointer' : 'cursor-default'}`}>
                          {item.image && (
                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover/item:scale-110" />
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
                    <Image 
                      src={item.images[0]} 
                      alt={item.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
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
