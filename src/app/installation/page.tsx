"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertTriangle, Ruler, Wrench, Hammer } from "lucide-react";

export default function InstallationPage() {
  const steps = [
    {
      title: "Подготовка поверхности",
      description: "Стена должна быть ровной, сухой и очищенной от пыли. Рекомендуется прогрунтовать поверхность для лучшей адгезии.",
      icon: <Ruler className="w-6 h-6" />,
    },
    {
      title: "Разметка",
      description: "Нанесите горизонтальную и вертикальную линии уровня. Это обеспечит идеальную симметрию при монтаже первой панели.",
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      title: "Нанесение клея",
      description: "Используйте специализированный клей для вашего типа панелей. Наносите его точечно или гребенкой на тыльную сторону.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      title: "Фиксация и затирка",
      description: "Прижмите панель к стене согласно разметке. После высыхания клея заполните швы финишной шпаклевкой.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="Installation Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <Hammer className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              Penza Installation Service
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
            Монтаж <br /> <span className="text-blue-500 italic font-light text-4xl md:text-6xl">в Пензе</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed">
            Профессиональная установка 3D панелей по всей Пензенской области. Мы не просто продаем — мы создаем готовые интерьерные решения.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-32 bg-slate-50/50 relative overflow-hidden">
        {/* Декоративный элемент фона */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0 hidden lg:block"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="h-full bg-white/40 backdrop-blur-md border border-white/60 p-10 hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5">
                  <div className="mb-8 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  
                  <span className="absolute top-6 right-8 text-7xl font-black text-slate-200/30 select-none group-hover:text-blue-600/10 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  
                  <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning/Tips Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-10 translate-x-1/4 -skew-x-12"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10 text-yellow-500">
              <AlertTriangle className="w-8 h-8" />
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Важные советы</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-blue-400">Акклиматизация</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Перед монтажом панели должны пролежать в помещении не менее 48 часов для выравнивания влажности и температуры.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-blue-400">Бесшовный монтаж</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Для создания единого полотна используйте только безусадочные шпаклевки и мелкозернистую наждачную бумагу для шлифовки.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-blue-400">Покраска</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Окрашивание рекомендуется производить краскопультом для равномерного покрытия всех изгибов 3D рельефа.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-blue-400">Освещение</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    3D эффект максимально раскрывается при боковом или направленном освещении. Учитывайте это при планировании света.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 text-center overflow-hidden">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-tighter leading-tight px-4">
            Нужна помощь профессионалов?
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mb-12 text-[11px] sm:text-sm uppercase tracking-widest px-4">
            Мы предоставляем услуги квалифицированного монтажа с гарантией на выполненные работы.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
            <Link href="/contacts" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-none px-8 sm:px-12 py-6 sm:py-8 uppercase tracking-widest text-xs">
                Заказать монтаж
              </Button>
            </Link>
            <Link href="/catalog" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full rounded-none px-8 sm:px-12 py-6 sm:py-8 uppercase tracking-widest text-xs">
                Вернуться в каталог
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
