"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { authClient } from "@/lib/auth-client";

function ProfileCard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl font-bold text-green-700">
            {user?.name?.charAt(0)}
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
        <p className="mb-6 text-gray-600">{user?.email}</p>
        <Link href="/profile/edit" className="btn btn-primary">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileCard />
    </AuthGuard>
  );
}