export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Breadcrumbs Skeleton */}
        <div className="h-4 w-48 bg-slate-50 rounded mb-12 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left: Images Skeleton */}
          <div className="space-y-6">
            <div className="aspect-square bg-slate-50 border border-slate-100 animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 border border-slate-100 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="h-3 w-24 bg-slate-100 rounded mb-4 animate-pulse"></div>
              <div className="h-12 w-full bg-slate-100 rounded mb-6 animate-pulse"></div>
              <div className="h-6 w-32 bg-slate-100 rounded animate-pulse"></div>
            </div>

            <div className="space-y-8 border-y border-slate-100 py-8 mb-8">
              <div className="space-y-4">
                <div className="h-3 w-32 bg-slate-50 rounded animate-pulse"></div>
                <div className="flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 w-24 bg-slate-50 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="h-24 w-full bg-slate-50 rounded animate-pulse"></div>
            </div>

            <div className="h-16 w-full bg-slate-900 rounded animate-pulse mb-12"></div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between py-4 border-b border-slate-50">
                  <div className="h-3 w-24 bg-slate-50 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-slate-50 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
