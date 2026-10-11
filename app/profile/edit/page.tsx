"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthGuard from "@/components/AuthGuard";
import { authClient } from "@/lib/auth-client";

function EditForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6"
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          প্রোফাইল আপডেট
        </h1>
        <label htmlFor="name" className="mb-1 block text-sm text-gray-600">
          নাম
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input mb-4 w-full"
          placeholder="আপনার নাম"
        />
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditForm />
    </AuthGuard>
  );
}