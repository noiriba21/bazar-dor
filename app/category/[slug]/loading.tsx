import { CardGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-6 h-9 w-48" />
      <CardGridSkeleton count={8} />
    </div>
  );
}