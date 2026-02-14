"use client";

import { CheckCircle2, Trophy, Users, Star, Info } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { label: "Лет опыта", value: "10+", icon: <Trophy className="w-5 h-5" /> },
    { label: "Проектов", value: "500+", icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: "Специалистов", value: "15", icon: <Users className="w-5 h-5" /> },
    { label: "Отзывов", value: "200+", icon: <Star className="w-5 h-5" /> },
  ];

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

      {/* Stats Section */}
      <section className="py-20 border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
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
    </div>
  );
}
