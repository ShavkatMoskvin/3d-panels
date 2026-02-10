"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Здесь можно логировать ошибку в сторонний сервис (например, Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-10 animate-pulse">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500 mb-6 block">
        System Error
      </span>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter text-slate-900">
        Что-то пошло <span className="font-light italic text-slate-300">не так</span>
      </h1>
      
      <p className="text-slate-500 max-w-md mx-auto uppercase text-[10px] tracking-widest leading-loose mb-12">
        Произошла непредвиденная ошибка. Мы уже работаем над её исправлением. Попробуйте обновить страницу.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => reset()}
          className="rounded-none px-12 py-8 uppercase tracking-widest text-xs flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Попробовать снова
        </Button>
        
        <Link href="/">
          <Button 
            variant="outline"
            className="rounded-none px-12 py-8 uppercase tracking-widest text-xs"
          >
            На главную
          </Button>
        </Link>
      </div>
      
      {error.digest && (
        <p className="mt-12 text-[8px] text-slate-300 uppercase tracking-widest">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
