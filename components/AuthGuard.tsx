"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}