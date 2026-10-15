"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function SortedProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // দাম সংখ্যা (number) হিসেবে সাজানো হয়, লেখা হিসেবে নয়।
  // তাই বাংলা অঙ্কে দেখানো দামও ঠিক ক্রমে আসে।
  const list = [...products];
  if (sort === "asc") list.sort((a, b) => a.today - b.today);
  if (sort === "desc") list.sort((a, b) => b.today - a.today);

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="w-52 appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-9 text-sm text-gray-800"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}