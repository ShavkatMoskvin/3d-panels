"use client";

import React from 'react';
import { Leaf, Wind, RefreshCw, ShieldCheck, Droplets, Sun } from 'lucide-react';
import { Product } from '@/types';

const iconMap = {
  leaf: Leaf,
  wind: Wind,
  recycle: RefreshCw,
  shield: ShieldCheck,
  droplets: Droplets,
  sun: Sun,
};

export function EcoPassport({ details }: { details: Product['ecoDetails'] }) {
  if (!details) return null;

  return (
    <div className="mt-12 p-8 bg-green-50/30 border border-green-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-green-100/50">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-green-600 mb-2 block">Eco-Passport</span>
          <h3 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">Экологический стандарт</h3>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Leaf 
              key={i} 
              className={`w-4 h-4 ${i < details.rating ? 'fill-green-500 text-green-500' : 'text-slate-200'}`} 
            />
          ))}
          <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-green-700">Premium Eco</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {details.labels.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Leaf;
          return (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-50 text-green-600 group-hover:scale-110 transition-transform">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-1">{item.label}</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {details.composition && (
        <div className="space-y-6 pt-6 border-t border-green-100/50">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Состав материала</h4>
          <div className="space-y-4">
            {details.composition.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-600">{item.material}</span>
                  <span className="text-slate-900">{item.percentage}%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000 ease-out" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {details.certificates && (
        <div className="mt-8 flex flex-wrap gap-3">
          {details.certificates.map((cert, idx) => (
            <span key={idx} className="px-3 py-1 bg-white border border-green-100 text-[8px] font-bold uppercase tracking-widest text-green-600 rounded-full">
              ✓ {cert}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
