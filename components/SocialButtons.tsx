"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const login = async (provider: "google" | "github") => {
    setLoading(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={loading !== null}
        onClick={() => login("google")}
        className="w-full rounded-xl border border-rose-200 bg-white py-2.5 text-sm font-semibold text-rose-950 transition hover:bg-rose-50 disabled:opacity-50"
      >
        {loading === "google" ? "অপেক্ষা করুন..." : "🇬 Google দিয়ে চালিয়ে যান"}
      </button>
      <button
        type="button"
        disabled={loading !== null}
        onClick={() => login("github")}
        className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {loading === "github" ? "অপেক্ষা করুন..." : "🐙 GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}