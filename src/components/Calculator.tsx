"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Plus, Minus, RotateCcw, LayoutGrid } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface PanelData {
  id: string;
  isActive: boolean;
  isWhole: boolean;
  visX: number;
  visY: number;
  visW: number;
  visH: number;
  x: number;
  y: number;
}

export function Calculator({ 
  product, 
  selectedVariation, 
  onCalculate, 
  extraItems = [],
  selectedColor,
  quantity,
  children
}: { 
  product: Product, 
  selectedVariation?: { size: string; price: number },
  onCalculate?: (quantity: number, extraItems?: { product: Product; quantity: number }[]) => void,
  extraItems?: { product: Product; quantity: number }[],
  selectedColor?: string,
  quantity?: number,
  children?: React.ReactNode
}) {
  const { items, addToCart, updateQuantity } = useCart();

  // Проверяем, есть ли основной товар уже в корзине
  const isMainProductInCart = useMemo(() => {
    const itemId = `${product.id}-${selectedVariation?.size || 'default'}-${selectedColor || 'default'}`;
    return items.some(item => `${item.id}-${item.selectedVariation?.size || 'default'}-${item.selectedColor || 'default'}` === itemId);
  }, [items, product.id, selectedVariation, selectedColor]);
  const [width, setWidth] = useState<string>("3000");
  const [height, setHeight] = useState<string>("2500");
  const [gap, setGap] = useState<number>(2);
  const [alignment, setAlignment] = useState<'left' | 'center'>('left');
  const [optimizeCuts, setOptimizeCuts] = useState<boolean>(true);
  const [removedPanels, setRemovedPanels] = useState<Set<string>>(new Set());
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMath, setRenderMath] = useState<{ originX: number; originY: number; scale: number; zoom: number } | null>(null);
  const [currentPanels, setCurrentPanels] = useState<PanelData[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [result, setResult] = useState<{
    panels: number;
    wholeCount: number;
    cutCount: number;
    savedPanels: number;
    glueQty: number; // упаковок
    groutQty: number; // упаковок
    area: number; // м2
  } | null>(null);

  // Находим расходники в данных
  const consumables = useMemo(() => ({
    glue: PRODUCTS.find(p => p.slug === 'glue-ultrafix-5kg'),
    grout: PRODUCTS.find(p => p.slug === 'grout-stone-finish-2kg')
  }), []);

  // Parse dimensions from variation size (e.g., "1200*600") or fallback to product specifications
  let panelW = product.specifications.width;
  let panelH = product.specifications.height;
  let currentPrice = product.price;

  if (selectedVariation) {
    const parts = selectedVariation.size.split('*').map(p => parseInt(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      panelW = parts[0];
      panelH = parts[1];
    }
    currentPrice = selectedVariation.price;
  }

  const prevTotalPanelsRef = useRef<number | null>(null);

  const calculate = useCallback(() => {
    const wallW = parseFloat(width.replace(",", "."));
    const wallH = parseFloat(height.replace(",", "."));

    if (isNaN(wallW) || isNaN(wallH) || wallW <= 0 || wallH <= 0) {
      setResult(null);
      return;
    }

    const panels: PanelData[] = [];
    let wholeCount = 0;
    let cutCount = 0;
    const requiredCuts: { w: number, h: number }[] = [];

    const stepX = panelW + gap;
    const stepY = panelH + gap;
    let startX = 0, startY = 0;

    if (alignment === 'center') {
      startX = -((stepX - (wallW % stepX)) / 2);
      startY = -((stepY - (wallH % stepY)) / 2);
    }

    for (let y = startY; y < wallH; y += stepY) {
      for (let x = startX; x < wallW; x += stepX) {
        const visLeft = Math.max(0, x), visRight = Math.min(wallW, x + panelW);
        const visW = visRight - visLeft;
        const visBottom = Math.max(0, y), visTop = Math.min(wallH, y + panelH);
        const visH = visTop - visBottom;

        if (visW <= 0.1 || visH <= 0.1) continue;

        const id = `p_${Math.round(x)}_${Math.round(y)}`;
        const isActive = !removedPanels.has(id);
        const isWhole = (Math.abs(visW - panelW) < 0.5 && Math.abs(visH - panelH) < 0.5);

        if (isActive) {
          if (isWhole) wholeCount++; 
          else { 
            cutCount++; 
            requiredCuts.push({w: visW, h: visH}); 
          }
        }
        panels.push({ id, isActive, isWhole, visX: visLeft, visY: visBottom, visW, visH, x, y });
      }
    }

    // Simple Bin Packing
    let panelsForCuts = 0;
    if (optimizeCuts && requiredCuts.length > 0) {
      requiredCuts.sort((a,b) => (b.w*b.h) - (a.w*a.h));
      const bins: {w: number, h: number}[] = [];
      requiredCuts.forEach(c => {
        const fitIndex = bins.findIndex(b => b.w >= c.w && b.h >= c.h);
        if (fitIndex !== -1) {
          // Subtractive logic from calc.html
          bins[fitIndex].w -= c.w;
        } else {
          panelsForCuts++;
          bins.push({w: panelW - c.w, h: panelH});
        }
      });
    } else {
      panelsForCuts = cutCount;
    }

    const totalPanels = wholeCount + panelsForCuts;
    const savedPanels = (wholeCount + cutCount) - totalPanels;
    const wallArea = (wallW * wallH) / 1000000;
    
    // Consumables logic
    let glueQty = 0;
    let groutQty = 0;

    if (consumables.glue?.consumableDetails) {
      const { coveragePerUnit, unit } = consumables.glue.consumableDetails;
      if (unit === 'm2') {
        glueQty = Math.ceil(wallArea / coveragePerUnit);
      } else if (unit === 'pcs') {
        glueQty = Math.ceil(totalPanels / coveragePerUnit);
      }
    } else {
      glueQty = Math.ceil(wallArea / 5);
    }

    if (consumables.grout?.consumableDetails) {
      const { coveragePerUnit } = consumables.grout.consumableDetails;
      groutQty = Math.ceil(wallArea / coveragePerUnit);
    } else {
      groutQty = Math.ceil(wallArea / 10);
    }

    const calculatedExtras = [];
    if (consumables.glue) calculatedExtras.push({ product: consumables.glue, quantity: glueQty });
    if (consumables.grout) calculatedExtras.push({ product: consumables.grout, quantity: groutQty });

    setResult({
      panels: totalPanels,
      wholeCount,
      cutCount,
      savedPanels,
      glueQty,
      groutQty,
      area: wallArea,
    });
    setCurrentPanels(panels);

    // Только если значения реально изменились
    if (prevTotalPanelsRef.current !== totalPanels) {
      prevTotalPanelsRef.current = totalPanels;
      // Мы НЕ добавляем расходники автоматически (по запросу пользователя: "предложить а не заставить")
      // Передаем текущие выбранные расходники (extraItems), а не рассчитанные (calculatedExtras)
      onCalculate?.(totalPanels, extraItems);
    }
  }, [width, height, gap, alignment, optimizeCuts, removedPanels, consumables, panelW, panelH, onCalculate, extraItems]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || currentPanels.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const wallW = parseFloat(width.replace(",", "."));
    const wallH = parseFloat(height.replace(",", "."));
    const margin = 40;
    
    // Base scale to fit wall in container
    const baseScale = Math.min((rect.width - margin*2)/wallW, (rect.height - margin*2)/wallH);
    const finalScale = baseScale * zoom;
    
    // Origin calculation with zoom and pan
    const originX = (rect.width - wallW * finalScale) / 2 + panOffset.x;
    const originY = (rect.height + wallH * finalScale) / 2 + panOffset.y;
    
    setRenderMath({ originX, originY, scale: finalScale, zoom });

    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Wall Background
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.05)"; 
    ctx.shadowBlur = 15;
    ctx.fillRect(originX, originY - wallH*finalScale, wallW*finalScale, wallH*finalScale);
    ctx.restore();
    
    ctx.strokeStyle = "#0f172a"; 
    ctx.lineWidth = 2 / dpr;
    ctx.strokeRect(originX, originY - wallH*finalScale, wallW*finalScale, wallH*finalScale);

    // Wall dimensions labels (only show if not zoomed in too much or at base zoom)
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 10px Inter";
    ctx.textAlign = "center";
    ctx.fillText(`${wallW} мм`, originX + (wallW*finalScale)/2, originY - wallH*finalScale - 10);
    
    ctx.save();
    ctx.translate(originX - 10, originY - (wallH*finalScale)/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(`${wallH} мм`, 0, 0);
    ctx.restore();

    currentPanels.forEach(p => {
      const px = originX + p.visX * finalScale, py = originY - (p.visY + p.visH) * finalScale;
      const pw = p.visW * finalScale, ph = p.visH * finalScale;

      // Full panel footprint (Ghost) for cut tiles
      if (p.isActive && !p.isWhole) {
        const fullPx = originX + p.x * finalScale;
        const fullPy = originY - (p.y + panelH) * finalScale;
        const fullPw = panelW * finalScale;
        const fullPh = panelH * finalScale;

        ctx.save();
        ctx.strokeStyle = "#cbd5e1"; 
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        ctx.strokeRect(fullPx, fullPy, fullPw, fullPh);
        
        // Light fill for the part outside
        ctx.fillStyle = "#f1f5f9";
        ctx.globalAlpha = 0.1;
        ctx.fillRect(fullPx, fullPy, fullPw, fullPh);
        ctx.restore();
      }

      ctx.save();
      if (!p.isActive) {
        ctx.strokeStyle = "#f1f5f9"; 
        ctx.setLineDash([4,4]); 
        ctx.strokeRect(px, py, pw, ph);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+pw, py+ph); ctx.stroke();
      } else {
        // Transparency logic: whole tiles are solid, cuts are semi-transparent
        if (p.isWhole) {
          ctx.fillStyle = "#f8fafc";
          ctx.globalAlpha = 1.0;
        } else {
          ctx.fillStyle = "#fff1f2";
          ctx.globalAlpha = 0.6; // Slightly transparent for cuts
        }
        
        ctx.fillRect(px, py, pw, ph);
        
        ctx.strokeStyle = p.isWhole ? "#e2e8f0" : "#fecaca"; 
        ctx.setLineDash([]); 
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, pw, ph);

        if (!p.isWhole) {
          ctx.strokeStyle = "#ef4444"; 
          ctx.setLineDash([4,2]); 
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (p.visX + p.visW < p.x + panelW) { ctx.moveTo(px+pw, py); ctx.lineTo(px+pw, py+ph); }
          if (p.visX > p.x) { ctx.moveTo(px, py); ctx.lineTo(px, py+ph); }
          if (p.visY + p.visH < p.y + panelH) { ctx.moveTo(px, py); ctx.lineTo(px+pw, py); }
          if (p.visY > p.y) { ctx.moveTo(px, py+ph); ctx.lineTo(px+pw, py+ph); }
          ctx.stroke();
          
          // Show dimensions for cuts if zoomed in enough
          if (zoom > 1.5) {
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "#ef4444";
            ctx.font = "8px Inter";
            if (pw > 20 && ph > 15) {
              ctx.fillText(`${Math.round(p.visW)}x${Math.round(p.visH)}`, px + pw/2, py + ph/2 + 3);
            }
          }
        }
      }
      ctx.restore();
    });
  }, [currentPanels, width, height, panelW, panelH, zoom, panOffset]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    
    setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const newZoom = Math.min(Math.max(zoom - e.deltaY * zoomSpeed, 0.5), 5);
    setZoom(newZoom);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Prevent click if we were dragging
    if (Math.abs(e.clientX - lastMousePos.current.x) > 5 || Math.abs(e.clientY - lastMousePos.current.y) > 5) {
      return;
    }

    if (!renderMath || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = (e.clientX - rect.left);
    const clickY = (e.clientY - rect.top);

    const { originX, originY, scale } = renderMath;
    const wallX = (clickX - originX) / scale;
    const wallY = (originY - clickY) / scale;

    const clickedPanel = currentPanels.find(p => 
      wallX >= p.visX && wallX <= p.visX + p.visW && 
      wallY >= p.visY && wallY <= p.visY + p.visH
    );

    if (clickedPanel) {
      const newRemoved = new Set(removedPanels);
      if (newRemoved.has(clickedPanel.id)) {
        newRemoved.delete(clickedPanel.id);
      } else {
        newRemoved.add(clickedPanel.id);
      }
      setRemovedPanels(newRemoved);
    }
  };

  const handleAddConsumable = (prod: Product, qty: number) => {
    const newExtra = [...extraItems, { product: prod, quantity: qty }];
    onCalculate?.(result?.panels || 0, newExtra);
    
    // Если основной товар уже в корзине, добавляем расходник сразу в корзину
    if (isMainProductInCart) {
      const cartId = `${prod.id}-default-default`;
      const existingInCart = items.find(i => `${i.id}-${i.selectedVariation?.size || 'default'}-${i.selectedColor || 'default'}` === cartId);
      if (!existingInCart) {
        addToCart(prod, qty);
      }
    }
  };

  const handleUpdateConsumableQty = (prod: Product, newQty: number) => {
    let newExtra;
    if (newQty <= 0) {
      newExtra = extraItems.filter(i => i.product.id !== prod.id);
    } else {
      newExtra = extraItems.map(i => i.product.id === prod.id ? { ...i, quantity: newQty } : i);
    }
    onCalculate?.(result?.panels || 0, newExtra);

    // Если основной товар уже в корзине, обновляем количество расходника в корзине
    if (isMainProductInCart) {
      const cartId = `${prod.id}-default-default`;
      updateQuantity(cartId, newQty);
    }
  };

  const handleToggleConsumable = (prod: Product, qty: number) => {
    const exists = extraItems.find(i => i.product.id === prod.id);
    if (exists) {
      handleUpdateConsumableQty(prod, 0);
    } else {
      handleAddConsumable(prod, qty);
    }
  };

  const totalPanelsPrice = (quantity ?? (result?.panels || 0)) * currentPrice;
  const extraTotal = extraItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalWithExtras = totalPanelsPrice + extraTotal;

  return (
    <div className="flex flex-col gap-8">
      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-blue-600"></div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Параметры стены</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ширина (мм)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-slate-50 border-b-2 border-slate-100 focus:border-blue-600 outline-none p-3 text-lg font-bold transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Высота (мм)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-slate-50 border-b-2 border-slate-100 focus:border-blue-600 outline-none p-3 text-lg font-bold transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Шов (мм)</label>
                <input
                  type="number"
                  value={gap}
                  onChange={(e) => setGap(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border-b-2 border-slate-100 focus:border-blue-600 outline-none p-3 text-lg font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Раскладка</label>
              <div className="flex p-1 bg-slate-100 rounded-lg">
                <button 
                  onClick={() => setAlignment('left')}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${alignment === 'left' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  От угла
                </button>
                <button 
                  onClick={() => setAlignment('center')}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${alignment === 'center' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  По центру
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer" onClick={() => setOptimizeCuts(!optimizeCuts)}>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block">Умная подрезка</span>
                  <p className="text-[9px] text-slate-400 leading-tight pr-4">Алгоритм объединяет мелкие обрезки, позволяя вырезать их из одной плиты. Это уменьшает итоговое количество панелей.</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${optimizeCuts ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${optimizeCuts ? 'left-6' : 'left-1'}`}></div>
                </div>
              </div>
              
              {optimizeCuts && (
                <div className="mx-2 p-3 bg-amber-50 border-l-2 border-amber-400 animate-in fade-in slide-in-from-top-1">
                  <p className="text-[9px] text-amber-800 leading-relaxed font-medium">
                    <span className="font-bold">⚠ Внимание:</span> При использовании обрезков рисунок 3D-панелей на стыках может не совпасть. Рекомендуется для опытных мастеров или однородных текстур.
                  </p>
                </div>
              )}
            </div>

            {removedPanels.size > 0 && (
              <Button 
                onClick={() => setRemovedPanels(new Set())}
                variant="outline"
                className="w-full rounded-none h-12 text-[9px] font-bold uppercase tracking-widest gap-2"
              >
                <RotateCcw size={14} />
                Сбросить исключения ({removedPanels.size})
              </Button>
            )}
          </div>
        </div>

        {/* Visual Canvas Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <LayoutGrid size={14} className="text-blue-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Интерактивный чертеж</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 italic">Нажмите на плитку, чтобы исключить её</span>
            </div>
            <div ref={containerRef} className="flex-1 relative bg-slate-50/30">
              <canvas 
                ref={canvasRef} 
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onWheel={handleWheel}
                className="block cursor-grab active:cursor-grabbing"
              />
              
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  onClick={() => setZoom(prev => Math.min(prev + 0.2, 5))}
                  className="w-10 h-10 bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors rounded-full"
                  title="Приблизить"
                >
                  <Plus size={16} className="text-slate-600" />
                </button>
                <button 
                  onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
                  className="w-10 h-10 bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors rounded-full"
                  title="Отдалить"
                >
                  <Minus size={16} className="text-slate-600" />
                </button>
                <button 
                  onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}
                  className="w-10 h-10 bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors rounded-full"
                  title="Сбросить вид"
                >
                  <RotateCcw size={16} className="text-slate-600" />
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/90 backdrop-blur-md p-4 border border-slate-200 shadow-xl flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white border border-slate-200"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Целая (100%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-50/60 border border-red-200 relative overflow-hidden">
                    <div className="absolute inset-0 border-t border-red-400 border-dashed top-1/2"></div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Подрезка (Прозрачно)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 border border-slate-200 border-dashed relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-[1px] bg-slate-200 rotate-45"></div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Исключено</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Cards */}
          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 border border-slate-200 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Площадь</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black">{result.area.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">м²</span>
                  </div>
                </div>
                <div className="bg-white p-5 border border-slate-200 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Целых</p>
                  <span className="text-xl font-black">{result.wholeCount}</span>
                </div>
                <div className="bg-white p-5 border border-slate-200 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Подрезка</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-red-500">{result.cutCount}</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">деталей</span>
                  </div>
                </div>
                <div className="bg-slate-900 p-5 text-white shadow-xl shadow-slate-200 relative overflow-hidden flex flex-col justify-between ">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Итого заказ</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-blue-400">{result.panels}</span>
                      <span className="text-[10px] font-bold text-blue-200 uppercase">шт.</span>
                    </div>
                  </div>

                  {result.savedPanels > 0 && optimizeCuts && (
                    <div className="absolute -right-6 top-2 bg-green-500 text-[8px] font-black px-8 py-1 rotate-45 text-white uppercase tracking-tighter">
                      -{result.savedPanels} шт
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Секция расходных материалов */}
      {result && (
        <div className="bg-white p-8 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="space-y-1">
                  <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Рекомендуемые сопутствующие материалы</h5>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Автоматический расчет на {result.area.toFixed(2)} м²</p>
                </div>
                {result && extraItems.length < (consumables.glue && consumables.grout ? 2 : 1) && (
                  <button 
                    onClick={() => {
                      const newExtra = [...extraItems];
                      const itemsToAdd: {product: Product, quantity: number}[] = [];
                      
                      if (consumables.glue && !extraItems.find(i => i.product.id === consumables.glue?.id)) {
                        const item = { product: consumables.glue, quantity: result.glueQty };
                        newExtra.push(item);
                        itemsToAdd.push(item);
                      }
                      if (consumables.grout && !extraItems.find(i => i.product.id === consumables.grout?.id)) {
                        const item = { product: consumables.grout, quantity: result.groutQty };
                        newExtra.push(item);
                        itemsToAdd.push(item);
                      }
                      onCalculate?.(result.panels, newExtra);

                      if (isMainProductInCart) {
                        itemsToAdd.forEach(item => {
                          const cartId = `${item.product.id}-default-default`;
                          const existingInCart = items.find(i => `${i.id}-${i.selectedVariation?.size || 'default'}-${i.selectedColor || 'default'}` === cartId);
                          if (!existingInCart) {
                            addToCart(item.product, item.quantity);
                          }
                        });
                      }
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 group w-fit"
                  >
                    <Plus className="w-3 h-3 mr-2 group-hover:rotate-90 transition-transform" />
                    Добавить всё рекомендуемое
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { key: 'glue', prod: consumables.glue, qty: result.glueQty },
                  { key: 'grout', prod: consumables.grout, qty: result.groutQty }
                ].map(({ key, prod, qty }) => {
                  if (!prod) return null;
                  const inCart = extraItems.find(i => i.product.id === prod.id);
                  const cartQty = inCart?.quantity || 0;
                  const detail = prod.consumableDetails;

                  return (
                    <div 
                      key={key}
                      className={`group relative flex flex-col sm:flex-row sm:items-center gap-5 p-6 transition-all duration-300 ${
                        cartQty > 0 
                          ? "bg-white border-slate-900 shadow-md" 
                          : !prod.inStock
                            ? "bg-slate-50/30 border-slate-100 opacity-60 grayscale"
                            : "bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-200"
                      } border`}
                    >
                      <div className="flex items-center gap-5 flex-1">
                        <div className="w-20 h-20 bg-white flex-shrink-0 overflow-hidden border border-slate-100 group-hover:border-slate-200 transition-colors relative flex items-center justify-center">
                          {prod.images[0] && (
                            <Image 
                              src={prod.images[0]} 
                              alt={prod.name} 
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-tight mb-2 text-slate-900">{prod.name}</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                {!prod.inStock ? "Нет в наличии" : `Норма: ${qty} шт.`}
                              </span>
                              {prod.inStock && (
                                <span className="text-[11px] font-bold text-slate-900">
                                  {(prod.price * (cartQty || qty)).toLocaleString()} ₽
                                </span>
                              )}
                            </div>
                            {detail?.description && (
                              <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Расход: {detail.description}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        {cartQty > 0 ? (
                          <div className="flex items-center bg-slate-900 text-white h-10 px-1 w-full sm:w-auto justify-between sm:justify-start">
                            <button 
                              onClick={() => handleUpdateConsumableQty(prod, cartQty - 1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-slate-800 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-10 sm:w-8 text-center text-[11px] font-black">{cartQty}</span>
                            <button 
                              onClick={() => handleUpdateConsumableQty(prod, cartQty + 1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-slate-800 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={!prod.inStock ? undefined : () => handleToggleConsumable(prod, qty)}
                            disabled={!prod.inStock}
                            className={`group/btn relative overflow-hidden px-6 h-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 w-full sm:w-auto ${
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
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-10 border-t border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center text-slate-400 max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Панели</span>
                    <span className="text-xs font-bold">{totalPanelsPrice.toLocaleString()} ₽</span>
                  </div>
                  {extraTotal > 0 && (
                    <div className="flex justify-between items-center text-slate-400 max-w-xs">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Материалы</span>
                      <span className="text-xs font-bold">{extraTotal.toLocaleString()} ₽</span>
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 block">Общая стоимость заказа</span>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">* Включая выбранные товары и запас на подрезку</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                    {totalWithExtras.toLocaleString()} <span className="text-2xl ml-1">₽</span>
                  </span>
                </div>
              </div>
            </div>

            {children && (
              <div className="mt-6 flex justify-end">
                <div className="w-full md:w-[400px]">
                  {children}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}