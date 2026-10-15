"use client";

import { useEffect, useState } from "react";
import { CardGridSkeleton } from "./Skeletons";

export default function LoadingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div>
        <p className="mb-4 text-gray-600">লোড হচ্ছে...</p>
        <CardGridSkeleton count={8} />
      </div>
    );
  }

  return <>{children}</>;
}