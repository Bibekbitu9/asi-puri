export default function SkeletonCard() {
  return (
    <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-300 shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          </div>
        </div>

        <div className="mt-6 h-10 bg-slate-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
}
