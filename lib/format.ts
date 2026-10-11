import type { Product } from "./types";

const bn = new Intl.NumberFormat("bn-BD");
const bnOneDecimal = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

// 1850 -> ১,৮৫০
export const toBn = (n: number) => bn.format(n);

// 148 -> ১৪৮ টাকা
export const formatPrice = (n: number) => `${bn.format(n)} টাকা`;

// এককের বাংলা লেখা
export const unitLabel: Record<Product["unit"], string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

// ▲ ২.১%  /  ▼ ২.৯%  /  —০.০%
export function formatChange(change: Product["change"]) {
  const pct = bnOneDecimal.format(Math.abs(change.pct));
  if (change.dir === "up") return `▲ ${pct}%`;
  if (change.dir === "down") return `▼ ${pct}%`;
  return `—${pct}%`;
}

// দাম বাড়লে সবুজ, কমলে লাল, একই থাকলে ধূসর
export const changeColor: Record<Product["change"]["dir"], string> = {
  up: "bg-green-100 text-green-700",
  down: "bg-red-100 text-red-700",
  flat: "bg-gray-200 text-gray-600",
};