import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-white text-slate-900">
      <span className="text-xs font-bold uppercase tracking-[0.5em] text-blue-600 mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
        Error 404
      </span>
      <h1 className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
        Страница <span className="font-light italic text-slate-300">не найдена</span>
      </h1>
      <p className="text-slate-500 uppercase text-xs tracking-[0.3em] mb-12 text-center max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        Похоже, эта стена еще не оформлена. Вернитесь в каталог, чтобы найти идеальное решение.
      </p>
      <Link href="/catalog" className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
        <Button size="lg" className="rounded-none px-12 py-8 uppercase tracking-widest text-xs">
          Вернуться в каталог
        </Button>
      </Link>
    </div>
  );
}
