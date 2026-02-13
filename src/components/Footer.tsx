import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <Image 
                src="/images/logo_white.svg" 
                alt="MoskWin" 
                width={120}
                height={32}
                className="h-8 w-auto transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Профессиональные решения для вашего интерьера от строительной компании MoskWin. 
              3D панели, монтаж и отделка под ключ в Пензе и области.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Покупателям</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/installation" className="hover:text-white transition-colors">Услуги монтажа</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Доставка и оплата</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Контакты</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>+7 (8412) 00-00-00</li>
              <li>shavkatmoskvin@gmail.com</li>
              <li>г. Пенза, ул. Производственная, 15</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MoskWin. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
