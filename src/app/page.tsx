import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);

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
                            <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden mb-8 border border-slate-100">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-200 font-light italic tracking-[0.5em] uppercase p-12 text-center text-[10px]">
                                        {product.name}
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
                                <h4 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h4>
                                <p className="text-slate-400 text-sm font-medium">От {product.price} ₽</p>
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
                "Дизайн — это не только то, как это выглядит и ощущается. Дизайн — это то, как это работает."
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
                <div className="flex gap-6">
                  <Link href="/catalog">
                    <Button className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
                      Выбрать панели
                    </Button>
                  </Link>
                  <Link href="/installation">
                    <Button variant="outline" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
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
    </div>
  );
}
