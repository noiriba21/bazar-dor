"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("redirected") === "1") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে!");
    router.push("/");
    router.refresh();
  };

  const input =
    "w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <Link href="/" className="text-3xl">🛒</Link>
          <h1 className="mt-2 text-2xl font-extrabold text-rose-950">সাইন ইন</h1>
          <p className="mt-1 text-sm text-slate-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">ইমেইল</label>
            <input
              type="email"
              className={input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</label>
            <input
              type="password"
              className={input}
              placeholder="পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:from-rose-700 hover:to-pink-700 disabled:opacity-50"
          >
            {loading ? "অপেক্ষা করুন..." : "লগইন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-rose-100" />
          অথবা
          <span className="h-px flex-1 bg-rose-100" />
        </div>

        <SocialButtons />

        <p className="mt-6 text-center text-sm text-slate-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-rose-600 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}