"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowLeft } from "lucide-react";
import { CartIndicator } from "./CartIndicator";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/catalog", label: "Каталог" },
    { href: "/installation", label: "Монтаж" },
    { href: "/about", label: "О нас" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <>
      <header className="h-20 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all border-b border-slate-100 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group" onClick={closeMenu}>
            <Image 
              src="/images/logo-black.svg" 
              alt="MoskWin" 
              width={120}
              height={32}
              className="h-8 w-auto transition-transform group-hover:scale-105" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-xs font-semibold uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <CartIndicator />
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-900 focus:outline-none z-[70] hover:bg-slate-100 rounded-full transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          isMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Overlay Backdrop (плавное затемнение и размытие) */}
        <div 
          className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-700 ease-in-out ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        ></div>

        {/* Drawer Panel (белая панель справа) */}
        <div className={`
          absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          <div className="flex flex-col h-full pt-6 px-6 relative">
            {/* Кнопка Назад */}
            <button 
              onClick={closeMenu}
              className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-colors mb-8 group"
            >
              <ArrowLeft size={24} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-base font-bold uppercase tracking-tight">Назад</span>
            </button>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="group py-4 border-b border-slate-50 flex flex-col"
                  onClick={closeMenu}
                >
                  <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    {index === 0 && "Всё для вашего интерьера"}
                    {index === 1 && "Профессиональные решения"}
                    {index === 2 && "История и ценности"}
                    {index === 3 && "Наши координаты"}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-10 space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Поддержка
                </p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:shavkatmoskvin@gmail.com" className="text-slate-600 hover:text-blue-600 transition-colors text-sm break-all">
                    shavkatmoskvin@gmail.com
                  </a>
                  <a href="https://t.me/moskvinsh" className="inline-flex items-center justify-center py-3 px-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
                    Написать в Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}