import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";
import EmptyState from "@/components/EmptyState";
import SortedProducts from "@/components/SortedProducts";

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

  // ক্যাটাগরি না থাকলে বা কোনো পণ্য না থাকলে
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
      <h1 className="text-3xl font-bold text-gray-900">
        {category.icon} {category.nameBn}
      </h1>
      <p className="mb-6 text-gray-600">
        {toBn(products.length)}টি পণ্যের আজকের দাম
      </p>
      {/* key দেওয়ায় প্রতিটা ক্যাটাগরিতে সাজান ও লোডিং নতুন করে শুরু হয় */}
      <SortedProducts key={category.slug} products={products} />
    </div>
  );
}