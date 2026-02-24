"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Если ссылки нет или произошла ошибка загрузки
  if (!src || error) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-slate-50 overflow-hidden border border-slate-100 ${className}`}>
        {/* Декоративный паттерн на фоне */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <ImageIcon className="w-8 h-8 text-slate-200 mb-4" strokeWidth={1} />
          <h3 className="text-[10px] md:text-xs font-light uppercase tracking-[0.3em] text-slate-400 leading-relaxed max-w-[200px]">
            {alt}
          </h3>
          <div className="mt-4 w-8 h-[1px] bg-slate-200" />
          <span className="mt-4 text-[8px] uppercase tracking-widest text-slate-300 font-bold">
            MoskWin Premium
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-slate-50 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-700 ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
