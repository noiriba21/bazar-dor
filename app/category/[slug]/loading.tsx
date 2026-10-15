import { CardGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-2 h-9 w-48" />
      <p className="mb-6 text-gray-600">লোড হচ্ছে...</p>
      <CardGridSkeleton count={8} />
    </div>
  );
}