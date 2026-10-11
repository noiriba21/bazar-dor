import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

function Section({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle: string;
  products: Product[];
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mb-5 text-gray-600">{subtitle}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-green-700">
              প্রতিদিনের বাজারদর
            </p>
            <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
              আজ বাজারে কোন পণ্যের কত দাম?
            </h1>
            <p className="mb-6 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দাম এবং দাম
              বাড়া-কমার খবর এক জায়গায়।
            </p>
            <a href="#সব-পণ্য" className="btn btn-primary">
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <Section
        title={
          <>
            আজ দাম বেড়েছে <span className="text-green-600">▲</span>
          </>
        }
        subtitle="গতকালের চেয়ে সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের"
        products={risers}
      />
      <Section
        title={
          <>
            আজ দাম কমেছে <span className="text-red-600">▼</span>
          </>
        }
        subtitle="গতকালের চেয়ে সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের"
        products={fallers}
      />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে"
        products={products}
      />
    </>
  );
}