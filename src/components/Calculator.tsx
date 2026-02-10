"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CalculatorProps {
  panelWidth?: number; // в мм
  panelHeight?: number; // в мм
}

export function Calculator({ panelWidth = 500, panelHeight = 500 }: CalculatorProps) {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{
    panels: number;
    glue: number; // кг
    area: number; // м2
  } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(width.replace(",", "."));
    const h = parseFloat(height.replace(",", "."));

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("Пожалуйста, введите корректные размеры стены");
      return;
    }

    // Площадь стены
    const wallArea = w * h;
    
    // Площадь одной панели (переводим мм в м)
    const panelArea = (panelWidth / 1000) * (panelHeight / 1000);

    // Количество панелей (округляем вверх)
    let panelsCount = Math.ceil(wallArea / panelArea);
    
    // Добавляем 10% на подрезку (рекомендуемый запас)
    const panelsWithReserve = Math.ceil(panelsCount * 1.1);

    // Расход клея (для 3D панелей):
    // 1. Для гипсовых: ~5-6 кг на м2 (с учетом затирки швов)
    // 2. Для полиуретана: ~0.5-1 кг на м2
    // В среднем для надежного монтажа и заполнения швов берем 5 кг/м2
    const glueConsumption = Math.ceil(wallArea * 5);

    setResult({
      panels: panelsWithReserve,
      glue: glueConsumption,
      area: wallArea,
    });
  };

  return (
    <div className="bg-slate-50 p-8 border border-slate-100">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">Калькулятор материалов</h3>
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Ширина стены (м)
            </label>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none px-0 py-2 text-sm font-bold transition-colors"
              placeholder="3.5"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Высота стены (м)
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none px-0 py-2 text-sm font-bold transition-colors"
              placeholder="2.7"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full rounded-none py-6 uppercase tracking-widest text-[10px] font-bold">
          Рассчитать
        </Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Площадь:</span>
              <span className="text-sm font-bold">{result.area.toFixed(2)} м²</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Панелей (+10%):</span>
              <span className="text-sm font-bold">{result.panels} шт.</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Клей / Шпаклевка:</span>
              <span className="text-sm font-bold">~{result.glue} кг</span>
            </div>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed mt-4">
              * Расчет является ориентировочным. Для гипсовых панелей расход включает клей и шпаклевку для швов.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
