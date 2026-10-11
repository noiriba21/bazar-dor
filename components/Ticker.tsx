import { getProducts } from "@/lib/api";
import {
  changeColor,
  formatChange,
  formatPrice,
  unitLabel,
} from "@/lib/format";

export default async function Ticker() {
  const products = await getProducts();
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white py-2 text-gray-800">
      <div className="animate-marquee flex w-max whitespace-nowrap text-sm">
        {items.map((p, i) => (
          <span key={`${p.id}-${i}`} className="flex items-center gap-2 pr-8">
            <span>{p.image}</span>
            <span className="font-semibold text-gray-900">{p.nameBn}</span>
            <span className="text-gray-700">
              {formatPrice(p.today)}/{unitLabel[p.unit].replace("প্রতি ", "")}
            </span>
            <span
              className={`rounded px-1.5 text-xs font-semibold ${changeColor[p.change.dir]}`}
            >
              {formatChange(p.change)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}