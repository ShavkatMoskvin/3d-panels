"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "Как рассчитать количество панелей?",
    answer: "Для расчета необходимо разделить площадь вашей стены на площадь одной панели (указана в характеристиках). Мы рекомендуем добавлять 5-10% на подрезку."
  },
  {
    question: "Какой клей использовать для монтажа?",
    answer: "Для гипсовых панелей подходит клей на гипсовой основе (например, Knauf Perlfix). Для полиуретана и камня — специализированные полимерные клей или жидкие гвозди."
  },
  {
    question: "Осуществляете ли вы доставку в другие регионы?",
    answer: "Да, мы отправляем заказы по всей России через транспортные компании (ПЭК, СДЭК, Деловые Линии). По Пензе доставка осуществляется собственной службой."
  },
  {
    question: "Можно ли красить панели?",
    answer: "Да, большинство наших панелей (особенно гипсовые и полиуретановые) предназначены под покраску. Рекомендуется использовать водоэмульсионные или акриловые краски."
  },
  {
    question: "Как ухаживать за 3D панелями?",
    answer: "Для повседневного ухода достаточно протирать панели мягкой сухой или слегка влажной тканью. Избегайте использования агрессивных чистящих средств с абразивными частицами."
  },
  {
    question: "Предоставляете ли вы услуги монтажа?",
    answer: "Да, мы выполняем профессиональный монтаж 3D панелей 'под ключ' в Пензе и Пензенской области. Наши мастера имеют большой опыт работы именно с этим материалом."
  }
];

export default function FAQPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" />
            <span>Назад на главную</span>
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-blue-600"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
                Помощь и ответы
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-8">
              Часто <br /> <span className="font-light italic text-slate-300">задаваемые вопросы</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl">
              Собрали для вас ответы на самые популярные вопросы о выборе, доставке и монтаже наших панелей.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="group bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-8 py-8 flex items-center justify-between text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest text-slate-900 pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 border border-slate-200 flex items-center justify-center transition-all duration-300 ${openFaqIndex === index ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 text-slate-500 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-slate-50 rounded-3xl text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-900">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-900 mb-4">Не нашли ответ?</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm">
              Напишите нам в Telegram или оставьте заявку, и мы подробно проконсультируем вас по любому вопросу.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contacts">
                <Button className="rounded-none bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 text-[10px] font-bold uppercase tracking-widest w-full sm:w-auto shadow-none">
                  Связаться с нами
                </Button>
              </Link>
              <a href="https://t.me/moskvinsh" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none bg-white border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-12 py-6 text-[10px] font-bold uppercase tracking-widest w-full sm:w-auto">
                  Написать в Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
