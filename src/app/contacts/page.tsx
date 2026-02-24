"use client";

import { Mail, Send, MessageSquare, Clock, ShieldCheck, Sparkles, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ContactsPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", contact: "", message: "", _honeypot: "" });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setIsSubmitted(true);
          setFormData({ name: "", contact: "", message: "", _honeypot: "" });
        } else {
          const errorText = await response.text();
          alert("Ошибка при отправке: " + errorText);
        }
      } catch {
        alert("Сетевая ошибка. Проверьте соединение.");
      } finally {
        setIsLoading(false);
      }
    };  const contactInfo = [
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
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="Contacts Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <Phone className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
            Наши <br /> <span className="text-blue-500 italic font-light text-4xl md:text-6xl">контакты</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed">
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
                        <p className="text-lg font-bold uppercase tracking-tight mb-1 break-all">{info.value}</p>
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
                
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Задать вопрос</h3>
                <p className="text-sm text-slate-500 mb-10 leading-relaxed">
                  Если у вас возникли вопросы по ассортименту или условиям, напишите нам. Мы ответим в течение дня.
                </p>

                {isSubmitted ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-bold uppercase tracking-tighter mb-4">Вопрос отправлен!</h4>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-md mx-auto">
                      Спасибо за ваше обращение. Мы ответим на ваш вопрос в течение рабочего дня.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-none px-8 py-6 uppercase tracking-widest text-xs border-slate-200 hover:bg-slate-50"
                    >
                      Задать еще вопрос
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Honeypot field - hidden from users, visible to bots */}
                    <div className="hidden" aria-hidden="true">
                      <input 
                        type="text" 
                        name="_honeypot" 
                        value={formData._honeypot}
                        onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                        tabIndex={-1} 
                        autoComplete="off" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Ваше имя *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors text-sm placeholder:text-slate-300" 
                        placeholder="Как к вам обращаться?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Телефон или Telegram *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors text-sm placeholder:text-slate-300" 
                        placeholder="+7 (999) 000-00-00 или @username"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Ваш вопрос *</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors text-sm min-h-[100px] resize-none placeholder:text-slate-300" 
                        placeholder="Например: Хочу узнать стоимость доставки в Пензу..."
                      ></textarea>
                    </div>
                    <Button 
                      disabled={isLoading}
                      className="w-full py-8 rounded-none bg-slate-900 hover:bg-blue-600 text-white transition-all uppercase text-xs font-bold tracking-[0.2em] group"
                    >
                      {isLoading ? "Отправка..." : "Отправить сообщение"}
                      {!isLoading && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Info Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-10 text-center">Юридическая информация</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-white p-8 md:p-12 border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Наименование</span>
                <p className="text-sm font-bold uppercase">ИП Москвин Станислав Владимирович</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ИНН</span>
                <p className="text-sm font-bold uppercase tracking-widest">023800419102</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ОГРНИП</span>
                <p className="text-sm font-bold uppercase tracking-widest">320583500029382</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Дата регистрации</span>
                <p className="text-sm font-bold uppercase tracking-widest">29 июля 2020 г.</p>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-1 pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Основной вид деятельности</span>
                <p className="text-xs text-slate-600 uppercase tracking-wider leading-relaxed">
                  43.39 Производство прочих отделочных и завершающих работ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
