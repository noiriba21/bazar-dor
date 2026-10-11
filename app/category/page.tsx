import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import SortedProducts from "@/components/SortedProducts";
import EmptyState from "@/components/EmptyState";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category || products.length === 0) {
    return (
      <EmptyState
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিটি নেই, অথবা এখানে এখনো কোনো পণ্য যোগ হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {category.icon} {category.nameBn}
      </h1>
      <SortedProducts products={products} />
    </div>
  );
}