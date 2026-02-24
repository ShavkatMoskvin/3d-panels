"use client";

import { Info, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="About Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              About MoskWin
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
            Строим <br /> <span className="text-blue-500 italic font-light text-4xl md:text-6xl">с душой</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed">
            MoskWin — это не просто строительная компания. Это команда профессионалов, влюбленных в свое дело. Мы специализируемся на инновационных решениях для интерьера.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8">Наша философия</h2>
              <div className="space-y-6 text-slate-500 text-sm leading-relaxed uppercase tracking-wider text-[11px]">
                <p>
                  Мы верим, что каждая деталь в интерьере имеет значение. 3D панели — это не просто отделочный материал, это способ придать пространству характер и глубину.
                </p>
                <p>
                  В MoskWin мы контролируем каждый этап: от подбора лучших материалов до финального монтажа. Наша цель — превзойти ожидания клиента и создать интерьер, который будет радовать долгие годы.
                </p>
                <p>
                  Мы постоянно следим за мировыми трендами в дизайне и архитектуре, чтобы предлагать нашим клиентам в Пензе и области самые современные и стильные решения.
                </p>
              </div>
            </div>
            <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-[0.2em]">
                Photo of our work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Legal Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-8">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">Официальность и прозрачность</h2>
            <p className="text-slate-500 text-sm uppercase tracking-widest leading-relaxed mb-10 max-w-2xl mx-auto">
              Мы дорожим своей репутацией и работаем в строгом соответствии с законодательством РФ. 
              Бренд <span className="text-slate-900 font-bold">MoskWin</span> представлен ИП Москвиным Станиславом Владимировичем, 
              зарегистрированным в 2020 году. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-8 border border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-blue-600">Договор</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
                  Заключаем официальный договор на поставку и монтаж, фиксируя сроки и стоимость.
                </p>
              </div>
              <div className="bg-white p-8 border border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-blue-600">Гарантия</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
                  Несем полную юридическую ответственность за качество материалов и выполненных работ.
                </p>
              </div>
              <div className="bg-white p-8 border border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-blue-600">Документы</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
                  Предоставляем все необходимые закрывающие документы и чеки для каждого заказа.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
