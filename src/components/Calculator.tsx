"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { Check, ShoppingCart } from "lucide-react";

interface CalculatorProps {
  product: Product;
  onCalculate?: (panels: number) => void;
}

export function Calculator({ product, onCalculate }: CalculatorProps) {
  const { addToCart } = useCart();
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    panels: number;
    glue: number; // кг
    area: number; // м2
  } | null>(null);

  const panelWidth = product.specifications.width;
  const panelHeight = product.specifications.height;

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
    const panelArea = (panelWidth / 1000) * (panelHeight / 1000);
    let panelsCount = Math.ceil(wallArea / panelArea);
    const panelsWithReserve = Math.ceil(panelsCount * 1.1);
    const glueConsumption = Math.ceil(wallArea * 5);

    setResult({
      panels: panelsWithReserve,
      glue: glueConsumption,
      area: wallArea,
    });

    if (onCalculate) {
      onCalculate(panelsWithReserve);
    }
  };

  const handleAddCalculated = () => {
    if (!result) return;
    
    // Добавляем нужное количество панелей сразу
    addToCart(product, result.panels);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

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
              placeholder="3.50"
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
              placeholder="2.70"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full rounded-none py-7 uppercase tracking-[0.2em] text-[10px] font-bold bg-slate-900 hover:bg-blue-600 transition-colors shadow-lg shadow-slate-100"
        >
          Рассчитать
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
              
              <div className="flex justify-between items-center p-4 bg-blue-50/50 border border-blue-100/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Необходимо панелей</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tighter text-blue-600">{result.panels}</span>
                  <span className="text-[10px] font-bold text-blue-400 uppercase">шт.</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Клей и расходники</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">~{result.glue}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">кг</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Итоговая стоимость</span>
                <span className="text-2xl font-black tracking-tighter text-slate-900">{(result.panels * product.price).toLocaleString()} ₽</span>
              </div>
            </div>

            <Button 
              onClick={handleAddCalculated} 
              className={`w-full rounded-none py-8 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-xl ${
                isAdded ? "bg-green-600 hover:bg-green-700 shadow-green-100" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              }`}
            >
              {isAdded ? (
                <><Check size={20} className="mr-3" /> В корзине</>
              ) : (
                <><ShoppingCart size={20} className="mr-3" /> Добавить {result.panels} шт.</>
              )}
            </Button>
            
            <div className="bg-slate-50 p-4 border-l-2 border-slate-200">
              <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
                * Расчет выполнен с учетом 10% запаса на подрезку и угловые элементы. Это гарантирует завершение монтажа без дозаказа.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}