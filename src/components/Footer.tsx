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
              <li><Link href="/installation" className="hover:text-white transition-colors">Монтаж</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Партнерам</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Доставка</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="/offer" className="hover:text-white transition-colors">Публичная оферта</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Контакты</h4>
            <div className="flex gap-6 mb-4 items-center">
              <a 
                href="https://t.me/moskvinsh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group transition-transform hover:scale-110"
                title="Telegram"
              >
                <svg 
                  viewBox="0 0 16 16" 
                  className="w-8 h-8 text-gray-500 fill-current group-hover:text-[#229ED9] transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="group transition-transform hover:scale-110"
                title="Max Messenger"
              >
                <Image 
                  src="/images/max-messenger-sign-logo.svg" 
                  alt="Max Messenger" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                />
              </a>
              <a 
                href="mailto:shavkatmoskvin@gmail.com" 
                className="group transition-transform hover:scale-110"
                title="Email"
              >
                <svg 
                  viewBox="0 0 20 20" 
                  className="w-8 h-8 text-gray-500 fill-current group-hover:text-white transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1c.146 0 .252-.011.403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z"/>
                </svg>
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 italic leading-relaxed">
              Работаем онлайн по всей Пензенской области
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MoskWin. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
