import { Truck, ShieldCheck, MapPin } from "lucide-react";

export default function ShippingPage() {
  const deliveryMethods = [
    {
      title: "Доставка по Пензе",
      description: "Доставка в черте города при наличии товара на складе.",
      time: "1-2 дня",
      price: "Бесплатно",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Доставка по области",
      description: "Осуществляем доставку во все населенные пункты Пензенской области.",
      time: "2-4 дня",
      price: "Бесплатно",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: "Гарантия сохранности",
      description: "Мы тщательно упаковываем каждую панель, чтобы она доехала до вас в идеальном состоянии.",
      time: "Всегда",
      price: "Включено",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 block">
            Shipping & Delivery
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter text-slate-900">
            Доставка <span className="font-light italic text-slate-300">и получение</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase text-xs tracking-widest leading-loose">
            Мы заботимся о том, чтобы ваши панели были доставлены вовремя и в полной сохранности. Работаем по всей Пензе и области.
          </p>
        </div>
      </section>

      {/* Delivery Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliveryMethods.map((method, index) => (
              <div key={index} className="relative group">
                <div className="h-full bg-white/40 backdrop-blur-md border border-slate-100 p-10 hover:bg-slate-50 transition-all duration-500 hover:-translate-y-2">
                  <div className="mb-8 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-500">
                    {method.icon}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-4">{method.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-widest mb-6">
                      {method.description}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Срок</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">{method.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Цена</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{method.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-10 uppercase tracking-tighter leading-tight">
              Важная информация <br /> <span className="font-light italic text-slate-500">о получении заказа</span>
            </h2>
            <div className="space-y-8">
              <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose">
                При получении товара обязательно проверьте целостность упаковки и количество мест. В случае обнаружения повреждений необходимо составить акт на месте.
              </p>
              <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose">
                Стоимость подъема на этаж рассчитывается индивидуально и зависит от веса панелей и наличия лифта.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
