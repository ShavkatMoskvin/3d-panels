"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { useState } from "react";
import { X, Star } from "lucide-react";

export default function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", text: "", rating: 5 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const featuredProducts = PRODUCTS.filter(p => p.inStock && !p.isHidden).slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setIsSubmitted(false);
      setReviewForm({ name: "", text: "", rating: 5 });
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/image.png" 
                        alt="Background" 
                        fill 
                        className="object-cover brightness-[0.6] animate-slow-zoom" 
                        priority
                    />
                </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                  Premium Wall Solutions
                </span>
                <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  Создаем <br /> <span className="font-light italic text-white/90">Ваше Пространство</span>
                </h2>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Почувствуйте пересечение искусства и архитектуры с нашей уникальной коллекцией 3D панелей.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Link href="/catalog">
                      <Button size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs bg-white text-black hover:bg-slate-100">
                        Смотреть каталог
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button variant="outline" size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs border-white/20 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                        О нас
                      </Button>
                    </Link>
                </div>
            </div>
        </section>

        {/* Categories Preview */}
        <section className="py-40 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-[1px] w-12 bg-blue-600"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
                        Коллекции
                      </span>
                    </div>
                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                      Текстуры <br /> <span className="font-light italic text-slate-300">и формы</span>
                    </h3>
                  </div>
                  <Link href="/catalog" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest pb-1">
                    <span className="border-b-2 border-slate-900 pb-1 group-hover:text-blue-600 group-hover:border-blue-600 transition-all">Смотреть все</span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                      →
                    </div>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {featuredProducts.map((product, index) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.slug}`} 
                          className={`group block transition-all duration-700 ${index === 1 ? 'md:mt-12' : ''}`}
                        >
                            <div className={`aspect-[4/5] bg-slate-50 relative overflow-hidden mb-8 border border-slate-100 ${!product.inStock ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                                {product.images && product.images.length > 0 && (
                                    <>
                                        <Image 
                                            src={product.images[0]} 
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    </>
                                )}
                                {!product.inStock && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                    <span className="bg-slate-900/90 text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 backdrop-blur-sm">
                                      Нет в наличии
                                    </span>
                                  </div>
                                )}
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                  <div className="bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest">
                                    Подробнее
                                  </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <div className="flex justify-between items-baseline mb-3">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                                      {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                                  </span>
                                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                    0{index + 1}
                                  </span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                  <div className="flex-1">
                                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h4>
                                    <p className="text-slate-400 text-sm font-medium">От {product.price} ₽</p>
                                  </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* Minimal Info Section */}
        <section className="py-32 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-light italic mb-8">
                &quot;Дизайн — это не только то, как это выглядит и ощущается. Дизайн — это то, как это работает.&quot;
              </h3>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                — Создаем совершенство с 2024 года
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 block">
                  Наши услуги
                </span>
                <h3 className="text-4xl md:text-6xl font-bold mb-10 uppercase tracking-tighter leading-tight">
                  Панели с <br /> <span className="font-light italic text-slate-300">установкой под ключ</span>
                </h3>
                <div className="space-y-8 mb-12">
                  <div className="flex gap-6">
                    <span className="text-2xl font-light text-slate-300">01</span>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Продажа панелей</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">Широкий ассортимент 3D панелей: от классического гипса до современного полиуретана и камня.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-2xl font-light text-slate-300">02</span>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Монтаж в Пензе</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">Профессиональная установка панелей по всей Пензенской области. Гарантия на все виды работ.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-2xl font-light text-slate-300">03</span>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Покраска и декор</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">Финишная отделка и покраска в любой цвет. Создаем идеальное бесшовное полотно.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link href="/catalog" className="w-full sm:w-auto">
                    <Button className="w-full rounded-none px-8 sm:px-12 py-6 sm:py-8 uppercase tracking-widest text-xs">
                      Выбрать панели
                    </Button>
                  </Link>
                  <Link href="/installation" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full rounded-none px-8 sm:px-12 py-6 sm:py-8 uppercase tracking-widest text-xs">
                      О монтаже
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-square bg-slate-50 flex items-center justify-center border border-slate-100 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-1000"></div>
                 <div className="relative z-10 text-center p-12">
                   <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">Penza Region Service</p>
                   <p className="text-xl font-light italic">Создаем уникальные интерьеры в Пензе и области.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    
      {/* Reviews Section */}
      <section className="py-40 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-blue-600"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
                  Отзывы клиентов
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                Мнения <br /> <span className="font-light italic text-slate-300">и опыт</span>
              </h2>
            </div>
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest pb-1"
            >
              <span className="border-b-2 border-slate-900 pb-1 group-hover:text-blue-600 group-hover:border-blue-600 transition-all">Оставить отзыв</span>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                +
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "r1",
                userName: "Александр В.",
                text: "Заказывал панели под бетон для гостиной. Качество на высоте, швов практически не видно после покраски. Доставили в Пензу за 2 дня.",
                rating: 5,
                date: "12.02.2024"
              },
              {
                id: "r2",
                userName: "Мария С.",
                text: "Очень довольна работой мастеров. Установили всё чисто и быстро. Панели смотрятся очень дорого и стильно. Рекомендую!",
                rating: 5,
                date: "05.02.2024"
              },
              {
                id: "r3",
                userName: "Дмитрий П.",
                text: "Отличный сервис. Помогли с выбором, сделали расчет расходников. Все приехало целое, упаковано надежно.",
                rating: 5,
                date: "28.01.2024"
              }
            ].map((review) => (
              <div key={review.id} className="p-10 bg-slate-50 border border-slate-100 flex flex-col hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, star) => (
                    <div key={star} className={`w-2 h-2 rounded-full ${star < review.rating ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600 mb-10 flex-1 italic group-hover:text-slate-900 transition-colors">&quot;{review.text}&quot;</p>
                <div className="flex justify-between items-center pt-8 border-t border-slate-200/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{review.userName}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl p-8 md:p-12 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <button 
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Star className="w-10 h-10 fill-current" />
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">Спасибо за отзыв!</h3>
                <p className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                  Ваше мнение очень важно для нас.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 block">
                    Обратная связь
                  </span>
                  <h3 className="text-4xl font-bold uppercase tracking-tighter">Ваш <span className="font-light italic text-slate-300">опыт</span></h3>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ваше имя</label>
                    <input 
                      required
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full border-b-2 border-slate-100 py-4 focus:border-blue-600 outline-none transition-colors uppercase text-sm font-bold tracking-widest"
                      placeholder="ИВАН ИВАНОВ"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Оценка</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 ${star <= reviewForm.rating ? 'fill-blue-600 text-blue-600' : 'text-slate-200'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ваш отзыв</label>
                    <textarea 
                      required
                      rows={4}
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      className="w-full border-2 border-slate-100 p-6 focus:border-blue-600 outline-none transition-colors text-sm leading-relaxed"
                      placeholder="Расскажите о ваших впечатлениях..."
                    />
                  </div>

                  <Button type="submit" className="w-full py-8 rounded-none uppercase tracking-[0.3em] text-xs bg-slate-900 hover:bg-blue-600">
                    Отправить отзыв
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
