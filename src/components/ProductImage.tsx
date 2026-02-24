"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  showText?: boolean; // Новый параметр для управления текстом
}

export function ProductImage({ 
  src, 
  alt, 
  className = "", 
  priority = false, 
  showText = true 
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || error) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-slate-50 overflow-hidden border border-slate-100 group/img ${className}`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        <div className="relative z-10 flex flex-col items-center px-2 text-center">
          {/* Иконка всегда видна */}
          <ImageIcon className={`${showText ? 'w-6 h-6 md:w-8 md:h-8' : 'w-5 h-5'} text-slate-200 mb-1 transition-transform group-hover/img:scale-110`} strokeWidth={1} />
          
          {/* Текст виден только если showText={true} и есть место */}
          {showText && (
            <div className="hidden sm:flex flex-col items-center animate-in fade-in duration-500">
              <h3 className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-tight max-w-[120px] line-clamp-1 mb-2">
                {alt}
              </h3>
              <div className="w-4 h-[1px] bg-slate-200 mb-2" />
            </div>
          )}
          
          <span className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-slate-300 font-black">
            MoskWin
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-slate-50 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover transition-all duration-1000 ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
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
