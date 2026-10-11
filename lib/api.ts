import { cacheLife } from "next/cache";
import type { Category, Product } from "./types";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

async function get<T>(path: string): Promise<T> {
  "use cache";
  cacheLife("minutes");
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// সব পণ্য
export const getProducts = () => get<Product[]>("/products");

// সব ক্যাটাগরি
export const getCategories = () => get<Category[]>("/categories");

// একটা ক্যাটাগরির পণ্য
export async function getProductsByCategory(slug: string) {
  const all = await getProducts();
  return all.filter((p) => p.category === slug);
}

// একটা পণ্য (না পেলে null)
export async function getProductBySlug(slug: string) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

// একটা ক্যাটাগরি (না পেলে null)
export async function getCategoryBySlug(slug: string) {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}