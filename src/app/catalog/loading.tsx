
export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      {/* Skeleton Header */}
      <section className="relative py-48 overflow-hidden bg-slate-900">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-white/20"></div>
            <div className="h-3 w-32 bg-white/10 rounded animate-pulse"></div>
            <div className="h-[1px] w-8 bg-white/20"></div>
          </div>
          <div className="h-16 md:h-24 w-2/3 max-w-2xl bg-white/10 rounded-xl mx-auto mb-10 animate-pulse"></div>
          <div className="h-4 w-full max-w-lg bg-white/10 rounded mx-auto animate-pulse"></div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        {/* Skeleton Categories */}
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-32 bg-slate-100 rounded-xl animate-pulse flex-shrink-0"></div>
          ))}
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-square bg-slate-50 border border-slate-100 mb-6 animate-pulse"></div>
              <div className="flex justify-between mb-3">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-slate-100 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-2/3 bg-slate-100 rounded mb-8 animate-pulse"></div>
              <div className="h-12 w-full bg-slate-50 border border-slate-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
