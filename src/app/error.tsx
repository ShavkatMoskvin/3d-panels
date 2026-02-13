"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, WifiOff } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  const isNetworkError = error.message?.toLowerCase().includes('network') || 
                        error.message?.toLowerCase().includes('fetch');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0 duration-500 ${
        isNetworkError ? "bg-blue-50" : "bg-red-50"
      }`}>
        {isNetworkError ? (
          <WifiOff className="w-10 h-10 text-blue-500" />
        ) : (
          <AlertTriangle className="w-10 h-10 text-red-500" />
        )}
      </div>
      
      <div className="space-y-4 mb-12">
        <span className={`text-[10px] font-bold uppercase tracking-[0.5em] block ${
          isNetworkError ? "text-blue-500" : "text-red-500"
        }`}>
          {isNetworkError ? "Connection Lost" : "Application Error"}
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-slate-900 leading-none">
          {isNetworkError ? (
            <>Проблемы с <span className="font-light italic text-slate-300 text-3xl md:text-4xl">сетью</span></>
          ) : (
            <>Упс! Что-то <span className="font-light italic text-slate-300 text-3xl md:text-4xl">сломалось</span></>
          )}
        </h1>
        
        <p className="text-slate-400 max-w-sm mx-auto text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
          {isNetworkError 
            ? "Похоже, возникли проблемы с интернет-соединением. Проверьте сеть и попробуйте обновить страницу."
            : "Произошла непредвиденная техническая ошибка. Мы уже уведомлены и скоро всё исправим."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <button 
          onClick={() => reset()}
          className="group flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-900/10"
        >
          <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          Повторить попытку
        </button>
        
        <Link href="/" className="group flex items-center justify-center gap-3 px-10 py-5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:border-slate-900 transition-all duration-300">
          <Home className="w-3.5 h-3.5" />
          На главную
        </Link>
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-50 w-full max-w-xs mx-auto">
        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em] mb-2">Техническая информация</p>
        <code className="text-[8px] text-slate-200 uppercase tracking-tighter bg-slate-50 px-2 py-1 rounded">
          {error.digest || "RUNTIME_ERR_INTERNAL"}
        </code>
      </div>
    </div>
  );
}
