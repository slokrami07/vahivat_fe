export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4 animate-pulse">
      {/* Header gradient area */}
      <div className="h-24 bg-slate-100 rounded-lg skeleton-shimmer" />
      
      {/* Avatar + title */}
      <div className="flex items-center gap-3 -mt-6">
        <div className="h-14 w-14 rounded-xl bg-slate-200 skeleton-shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded-full w-3/4 skeleton-shimmer" />
          <div className="h-3 bg-slate-100 rounded-full w-1/2 skeleton-shimmer" />
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-slate-100 rounded-full skeleton-shimmer" />
        <div className="h-6 w-20 bg-slate-100 rounded-full skeleton-shimmer" />
        <div className="h-6 w-14 bg-slate-100 rounded-full skeleton-shimmer" />
      </div>
      
      {/* Rating line */}
      <div className="h-3 bg-slate-100 rounded-full w-2/3 skeleton-shimmer" />
      
      {/* Button */}
      <div className="h-10 bg-slate-200 rounded-full w-full skeleton-shimmer" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-100 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-slate-200 skeleton-shimmer" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded-full w-1/2 skeleton-shimmer" />
        <div className="h-3 bg-slate-100 rounded-full w-3/4 skeleton-shimmer" />
      </div>
      <div className="h-8 w-20 bg-slate-100 rounded-full skeleton-shimmer" />
    </div>
  )
}
