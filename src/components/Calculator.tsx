"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { Check, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import Link from "next/link";

interface CalculatorProps {
  product: Product;
  selectedVariation?: { size: string; price: number };
  onCalculate?: (quantity: number, extraItems?: { product: Product; quantity: number }[]) => void;
}

export function Calculator({ 
  product, 
  selectedVariation, 
  onCalculate,
  extraItems = []
}: { 
  product: Product, 
  selectedVariation?: { size: string; price: number },
  onCalculate?: (quantity: number, extraItems?: { product: Product; quantity: number }[]) => void,
  extraItems?: { product: Product; quantity: number }[]
}) {
  const { addToCart, updateQuantity } = useCart();
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    panels: number;
    glueQty: number; // упаковок
    groutQty: number; // упаковок
    area: number; // м2
  } | null>(null);

  // Находим расходники в данных
  const consumables = useMemo(() => ({
    glue: PRODUCTS.find(p => p.slug === 'glue-ultrafix-5kg'),
    grout: PRODUCTS.find(p => p.slug === 'grout-stone-finish-2kg')
  }), []);

  const glueInCartQty = extraItems.find(i => i.product.id === consumables.glue?.id)?.quantity || 0;
  const groutInCartQty = extraItems.find(i => i.product.id === consumables.grout?.id)?.quantity || 0;

  // Parse dimensions from variation size (e.g., "1200*600") or fallback to product specifications
  let currentWidth = product.specifications.width;
  let currentHeight = product.specifications.height;
  let currentPrice = product.price;

  if (selectedVariation) {
    const parts = selectedVariation.size.split('*').map(p => parseInt(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      currentWidth = parts[0];
      currentHeight = parts[1];
    }
    currentPrice = selectedVariation.price;
  }

  const handleCalculate = () => {
    setError(null);
    const w = parseFloat(width.replace(",", "."));
    const h = parseFloat(height.replace(",", "."));

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError("Пожалуйста, введите корректные размеры стены");
      setResult(null);
      return;
    }

    const wallArea = w * h;
    const panelArea = (currentWidth / 1000) * (currentHeight / 1000);
    let panelsCount = Math.ceil(wallArea / panelArea);
    const panelsWithReserve = Math.ceil(panelsCount * 1.1);
    
    // Клей: ~5кг на 1м2. Упаковка 5кг. Значит 1 упаковка на 1м2.
    const glueQty = Math.ceil(wallArea); 
    // Затирка: ~1.5кг на 1м2. Упаковка 2кг.
    const groutQty = Math.ceil(wallArea * 1.5 / 2);

    setResult({
      panels: panelsWithReserve,
      glueQty: glueQty,
      groutQty: groutQty,
      area: wallArea,
    });

    // Больше не добавляем расходники автоматически при расчете
    if (onCalculate) {
      onCalculate(panelsWithReserve, extraItems);
    }
  };

  const handleAddConsumable = (prod: Product, qty: number) => {
    const newExtra = [...extraItems, { product: prod, quantity: qty }];
    onCalculate?.(result?.panels || 0, newExtra);
  };

  const handleUpdateConsumableQty = (prod: Product, newQty: number) => {
    let newExtra;
    if (newQty <= 0) {
      newExtra = extraItems.filter(i => i.product.id !== prod.id);
    } else {
      newExtra = extraItems.map(i => i.product.id === prod.id ? { ...i, quantity: newQty } : i);
    }
    onCalculate?.(result?.panels || 0, newExtra);
  };

  const handleToggleConsumable = (prod: Product, qty: number) => {
    const exists = extraItems.find(i => i.product.id === prod.id);
    if (exists) {
      handleUpdateConsumableQty(prod, 0);
    } else {
      handleAddConsumable(prod, qty);
    }
  };

  const totalPanelsPrice = (result?.panels || 0) * currentPrice;
  const extraTotal = extraItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalWithExtras = totalPanelsPrice + extraTotal;

  const panelsInCart = result?.panels || 0;

  return (
    <div className="bg-white p-6 sm:p-10 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-[1px] bg-blue-600"></div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Калькулятор материалов</h3>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-10">
          <div className="relative group">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-600">
              Ширина стены (м)
            </label>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none px-0 py-2 text-base font-bold transition-all placeholder:text-slate-200"
              placeholder="3.00"
            />
          </div>
          <div className="relative group">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-600">
              Высота стены (м)
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none px-0 py-2 text-base font-bold transition-all placeholder:text-slate-200"
              placeholder="3.00"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full rounded-none py-7 uppercase tracking-[0.2em] text-[10px] font-bold bg-slate-900 hover:bg-blue-600 transition-colors shadow-lg shadow-slate-100"
        >
          {result ? "Пересчитать" : "Рассчитать"}
        </Button>

        {error && (
          <div className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-50 p-3 text-center animate-in fade-in slide-in-from-top-1 duration-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 pt-10 border-t border-slate-100 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex justify-between items-center group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Площадь поверхности</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{result.area.toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">м²</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-6 bg-slate-900 text-white">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Требуется панелей</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter">{result.panels}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">шт.</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-1">Стоимость</span>
                  <span className="text-xl font-bold tracking-tight">{(result.panels * currentPrice).toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Расходники - Дизайнерская логика */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Добавить сопутствующие материалы</h5>
                  <div className="h-[1px] flex-1 bg-slate-100 ml-6"></div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { key: 'glue', prod: consumables.glue, qty: result.glueQty, label: 'уп. по 5кг' },
                    { key: 'grout', prod: consumables.grout, qty: result.groutQty, label: 'уп. по 2кг' }
                  ].map(({ key, prod, qty, label }) => {
                    if (!prod) return null;
                    const inCart = extraItems.find(i => i.product.id === prod.id);
                    const cartQty = inCart?.quantity || 0;

                    return (
                      <div 
                        key={key}
                        className={`group relative flex items-center gap-5 p-4 transition-all duration-300 ${
                          cartQty > 0 
                            ? "bg-white border-slate-900 shadow-md" 
                            : !prod.inStock
                              ? "bg-slate-50/30 border-slate-100 opacity-60 grayscale"
                              : "bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-200"
                        } border`}
                      >
                        <div className="w-16 h-16 bg-white flex-shrink-0 overflow-hidden border border-slate-100 group-hover:border-slate-200 transition-colors">
                          <img src={prod.images[0]} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-tight mb-1 text-slate-900">{prod.name}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              {!prod.inStock ? "Нет в наличии" : `Рекомендуем: ${qty} ${label}`}
                            </span>
                            {prod.inStock && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                <span className="text-[10px] font-bold text-slate-900">
                                  {(prod.price * (cartQty || qty)).toLocaleString()} ₽
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {cartQty > 0 ? (
                            <div className="flex items-center bg-slate-900 text-white h-10 px-1">
                              <button 
                                onClick={() => handleUpdateConsumableQty(prod, cartQty - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-slate-800 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-[11px] font-black">{cartQty}</span>
                              <button 
                                onClick={() => handleUpdateConsumableQty(prod, cartQty + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-slate-800 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={!prod.inStock ? undefined : () => handleToggleConsumable(prod, qty)}
                              disabled={!prod.inStock}
                              className={`group/btn relative overflow-hidden px-6 h-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                                !prod.inStock
                                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                  : "bg-white border-slate-900 text-slate-900 hover:text-white"
                              } border`}
                            >
                              <span className="relative z-10">{!prod.inStock ? "Отсутствует" : "Добавить"}</span>
                              {prod.inStock && (
                                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                              )}
                            </button>
                          )}
                        </div>

                        {cartQty > 0 && (
                          <div className="absolute -top-2 -right-2 bg-slate-900 text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            <Check size={10} strokeWidth={4} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-8 mt-4 border-t border-slate-100">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Стоимость панелей</span>
                    <span className="text-xs font-bold">{(result.panels * currentPrice).toLocaleString()} ₽</span>
                  </div>
                  {extraTotal > 0 && (
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Расходные материалы</span>
                      <span className="text-xs font-bold">{extraTotal.toLocaleString()} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end mt-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 block">Итоговая сумма</span>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">* Включая выбранные материалы</p>
                    </div>
                    <span className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
                      {totalWithExtras.toLocaleString()} <span className="text-xl">₽</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-l-2 border-slate-200">
              <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
                * Расчет выполнен с учетом 10% запаса на подрезку и угловые элементы.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}