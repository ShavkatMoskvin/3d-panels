"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";


declare global {
  interface Window {
    PaymentIntegration?: any;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, includeInstallation, installationPrice } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    house: "",
    apartment: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name.toLowerCase()]: value }));
  };

  const payWithTBank = () => {
    if (typeof window !== "undefined" && window.PaymentIntegration) {
      const terminalKey = process.env.NEXT_PUBLIC_TBANK_TERMINAL_KEY;
      
      const initConfig = {
        terminalKey: terminalKey,
        product: 'eacq',
        features: {
          payment: {
            orderId: `ORDER-${Date.now()}`,
            amount: totalPrice * 100, // В копейках
            customerEmail: formData.email,
            customerPhone: formData.phone,
            items: items.map(item => ({
              name: item.name,
              price: item.price * 100,
              quantity: item.quantity,
              amount: item.price * item.quantity * 100
            }))
          },
          iframe: {
            enabled: true
          }
        }
      };

      window.PaymentIntegration.init(initConfig)
        .then(() => {
          // После успешной инициализации вызываем оплату
          handleSubmit();
        })
        .catch((err: any) => {
          console.error("Payment init error:", err);
          alert("Ошибка при инициализации оплаты");
        });
    } else {
      alert("Платежная система загружается, подождите немного или обновите страницу");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          },
          address: {
            city: formData.city,
            street: formData.street,
            house: formData.house,
            apartment: formData.apartment
          },
          items,
          totalPrice,
          installation: includeInstallation ? {
            included: true,
            price: installationPrice
          } : { included: false },
          paymentStatus: "Ожидает подтверждения (QR-код)"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        alert("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Ошибка сети. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">Заказ принят</h1>
        <p className="text-slate-500 uppercase text-xs tracking-[0.3em] mb-12 max-w-md leading-relaxed">
          Спасибо за ваш заказ! Мы уже получили уведомление и свяжемся с вами в ближайшее время после проверки оплаты.
        </p>
        <Link href="/catalog">
          <Button size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
            Вернуться в каталог
          </Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter">Корзина пуста</h1>
        <Link href="/catalog">
          <Button size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
            В каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
          <div className={`px-4 bg-white transition-colors ${step >= 1 ? "text-blue-600" : "text-slate-300"}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">01. Контакты</span>
          </div>
          <div className={`px-4 bg-white transition-colors ${step >= 2 ? "text-blue-600" : "text-slate-300"}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">02. Оплата</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side: Forms */}
          <div>
            {step === 1 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Данные доставки</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="ВАШЕ ИМЯ"
                    className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="ТЕЛЕФОН"
                    className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="ГОРОД"
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                      onChange={handleInputChange}
                      value={formData.city}
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="УЛИЦА"
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                      onChange={handleInputChange}
                      value={formData.street}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="house"
                      placeholder="ДОМ"
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                      onChange={handleInputChange}
                      value={formData.house}
                    />
                    <input
                      type="text"
                      name="apartment"
                      placeholder="КВ / ОФИС"
                      className="w-full border-b border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors uppercase text-xs tracking-widest"
                      onChange={handleInputChange}
                      value={formData.apartment}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  className="w-full rounded-none py-8 uppercase tracking-widest text-xs"
                  disabled={!formData.name || !formData.phone}
                >
                  Перейти к оплате
                </Button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Оплата заказа</h2>
                <div className="bg-slate-50 p-8 border border-slate-100 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold tracking-tighter">{totalPrice} ₽</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">К оплате</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                      Нажмите кнопку ниже для перехода к безопасной оплате заказа. 
                      После успешной транзакции наш менеджер свяжется с вами для уточнения деталей доставки.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="rounded-none py-8 px-6 uppercase tracking-widest text-xs"
                  >
                    Назад
                  </Button>
                  <Button 
                    onClick={payWithTBank}
                    className="flex-1 rounded-none py-8 uppercase tracking-widest text-xs bg-slate-900 hover:bg-blue-600 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Обработка..." : "Оплатить"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-slate-50 p-10 h-fit border border-slate-100">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-8">Ваш заказ</h3>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{item.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.quantity} шт. x {item.price} ₽</p>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest">{item.price * item.quantity} ₽</p>
                </div>
              ))}
              {includeInstallation && (
                <div className="flex justify-between items-start gap-4 pt-4 border-t border-slate-100">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">Монтаж панелей</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Профессиональная установка (15%)</p>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest text-blue-600">{installationPrice} ₽</p>
                </div>
              )}
              <div className="flex justify-between items-start gap-4 pt-4 border-t border-slate-100">
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-1">Доставка</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Курьером по адресу</p>
                </div>
                <p className="text-[10px] font-bold tracking-widest text-green-600">БЕСПЛАТНО</p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest">Итого</span>
              <span className="text-2xl font-bold tracking-tighter">{totalPrice} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
