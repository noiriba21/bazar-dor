import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  changeColor,
  formatChange,
  formatPrice,
  unitLabel,
} from "@/lib/format";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 text-5xl">{p.image}</div>
      <h3 className="text-lg font-bold text-gray-900">{p.nameBn}</h3>
      <p className="text-sm text-gray-500">{unitLabel[p.unit]}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(p.today)}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${changeColor[p.change.dir]}`}
        >
          {formatChange(p.change)}
        </span>
      </div>
    </Link>
  );
}