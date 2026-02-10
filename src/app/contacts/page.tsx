"use client";

import { Mail, Send, MessageSquare, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const contactInfo = [
    {
      title: "Email",
      value: "shavkatmoskvin@gmail.com",
      link: "mailto:shavkatmoskvin@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      description: "Для официальных запросов и предложений"
    },
    {
      title: "Telegram",
      value: "@moskvinsh",
      link: "https://t.me/moskvinsh",
      icon: <Send className="w-6 h-6" />,
      description: "Быстрая связь и консультации 24/7"
    },
  ];

  const benefits = [
    {
      title: "Быстрый ответ",
      description: "Отвечаем в Telegram в течение 15 минут в рабочее время.",
      icon: <Clock className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Консультация",
      description: "Поможем рассчитать количество панелей и подобрать клей.",
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Надежность",
      description: "Гарантируем сохранность данных и прозрачность сделки.",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 block">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter">
            Наши <span className="font-light italic text-slate-300">контакты</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase text-xs tracking-widest leading-loose">
            Мы перешли на полностью цифровой формат общения для вашего удобства. 
            Пишите нам в любое время.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side: Modern Contacts & Benefits */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-10 flex items-center gap-4">
                  Связь с нами <Sparkles className="w-6 h-6 text-blue-600" />
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <a 
                      key={index} 
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-6 p-8 bg-white border border-slate-100 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500"
                    >
                      <div className="w-14 h-14 bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                        {info.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                          {info.title}
                        </span>
                        <p className="text-lg font-bold uppercase tracking-tight mb-1">{info.value}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="pt-16 border-t border-slate-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-10">Почему стоит написать нам:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="space-y-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest">{benefit.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-full -z-10"></div>
              <div className="bg-white p-10 md:p-16 border border-slate-900 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-900 flex items-center justify-center -translate-y-1/2 translate-x-1/2 hidden md:flex">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Напишите нам</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-10 leading-loose">
                  Оставьте заявку, и мы подготовим для вас индивидуальное предложение с расчетом доставки.
                </p>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Ваше Имя</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest" 
                      placeholder="ИВАН ИВАНОВ"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Telegram или Телефон</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest" 
                      placeholder="@USERNAME ИЛИ +7..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Ваш вопрос</label>
                    <textarea 
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest min-h-[100px] resize-none" 
                      placeholder="ОПИШИТЕ ВАШ ПРОЕКТ..."
                    ></textarea>
                  </div>
                  <Button className="w-full py-8 rounded-none bg-slate-900 hover:bg-blue-600 text-white transition-all uppercase text-xs font-bold tracking-[0.2em] group">
                    Отправить сообщение
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
