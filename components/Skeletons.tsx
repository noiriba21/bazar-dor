export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="skeleton mb-3 h-12 w-12" />
          <div className="skeleton mb-2 h-5 w-3/4" />
          <div className="skeleton mb-4 h-4 w-1/2" />
          <div className="skeleton h-6 w-full" />
        </div>
      ))}
    </div>
  );
}