import Link from "next/link";
import { notFound } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { getProductBySlug } from "@/lib/api";
import {
  changeColor,
  formatChange,
  formatPrice,
  unitLabel,
} from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      p.markets.length,
  );
  const divisions = Array.from(new Set(p.markets.map((m) => m.division)));

  const history: [string, number][] = [
    ["গতকাল", p.yesterday],
    ["গত সপ্তাহ", p.lastWeek],
    ["গত মাস", p.lastMonth],
  ];

  return (
    <AuthGuard>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href={`/category/${p.category}`}
          className="mb-4 inline-block text-sm text-green-700 hover:underline"
        >
          ← {p.categoryNameBn} ক্যাটাগরিতে ফিরে যান
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-6xl">{p.image}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{p.nameBn}</h1>
              <p className="text-gray-600">
                দেশের {divisions.length}টি বিভাগের বাজার থেকে নেওয়া আজকের দামের
                সারসংক্ষেপ।
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="badge badge-outline">
                  {p.categoryIcon} {p.categoryNameBn}
                </span>
                <span className="badge badge-outline">{unitLabel[p.unit]}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">আজকের দাম</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(p.today)}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${changeColor[p.change.dir]}`}
              >
                {formatChange(p.change)}
              </span>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(min)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(max)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">গড় দাম</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(avg)}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {history.map(([label, price]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm"
              >
                <span className="text-gray-600">{label}ের দাম</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {divisions.map((d) => (
            <div
              key={d}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <h3 className="mb-2 font-bold text-gray-900">📍 {d}</h3>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th>সর্বনিম্ন</th>
                      <th>সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.markets
                      .filter((m) => m.division === d)
                      .map((m) => (
                        <tr key={m.market}>
                          <td>{m.market}</td>
                          <td>{formatPrice(m.min)}</td>
                          <td>{formatPrice(m.max)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}