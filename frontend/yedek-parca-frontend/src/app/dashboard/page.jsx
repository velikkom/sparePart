"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Merhaba { session?.user?.email || session?.user?.name}</p>
    </div>
  );
}
