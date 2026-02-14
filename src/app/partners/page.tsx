import { Users, Palette } from "lucide-react";
import Image from "next/image";

export default function PartnersPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png" 
            alt="Partners Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              Наше сообщество
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
            Наши <br /> <span className="text-blue-500 italic font-light">Партнеры</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed">
            Профессионалы, которые доверяют нашему качеству и создают уникальные проекты вместе с нами.
          </p>
        </div>
      </section>

      {/* Partners Grid - Real Existing Partners */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div 
                key={i} 
                className="aspect-[4/3] border border-slate-100 flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-700 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 group relative bg-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:to-blue-50/50 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-all duration-500">
                    <Users className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors text-center">
                    Название <br /> партнера {i}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Collaboration Section (Recommendation) */}
      <section className="py-32 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden group">
                    <Image src="/images/products/Dolomitic Travertine-Claybank.jpg" alt="Work" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="aspect-square bg-slate-900 flex items-center justify-center p-8">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed text-center">
                      Более 100 <br /> совместных <br /> проектов
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-square bg-blue-600 flex items-center justify-center p-8">
                    <Palette className="w-12 h-12 text-white/20" />
                  </div>
                  <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden group">
                    <Image src="/images/products/Linear Travertine-Roman white.png" alt="Work" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">
                Коллаборации
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-8">
                Проекты <br /> <span className="font-light italic text-slate-300">в деталях</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-md">
                Мы гордимся тем, что наши материалы становятся частью работ ведущих дизайнеров. Каждое партнерство — это уникальная история создания идеального пространства.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Авторский надзор</h4>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">Полное соответствие дизайн-проекту</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Индивидуальные решения</h4>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">Подбор текстур под конкретный запрос</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">Остались вопросы?</h3>
            <p className="text-slate-500 text-sm mb-10">Если вы хотите узнать больше о наших материалах или обсудить проект, мы всегда на связи.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://t.me/moskvinsh" className="px-10 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
                Telegram
              </a>
              <a href="mailto:shavkatmoskvin@gmail.com" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
