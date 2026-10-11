"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/types";

const linkClass = (active: boolean) =>
  `block whitespace-nowrap rounded-full px-3 py-1 ${
    active
      ? "bg-primary text-primary-content"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

export default function NavbarClient({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="block">
          <span className="text-xl font-bold text-gray-900">🛒 বাজার দর</span>
          <span className="block min-h-4 text-xs text-gray-500">{today}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-28" />
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-ghost btn-sm">
                👤
                <span className="hidden max-w-28 truncate sm:inline">
                  {session.user.name}
                </span>
              </Link>
              <button onClick={handleSignOut} className="btn btn-outline btn-sm">
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-sm">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
        <ul className="flex w-max gap-2 text-sm">
          <li>
            <Link href="/" className={linkClass(pathname === "/")}>
              🏠 হোম
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className={linkClass(pathname === `/category/${c.slug}`)}
              >
                {c.icon} {c.nameBn}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}