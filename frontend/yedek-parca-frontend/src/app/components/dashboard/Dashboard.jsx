"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("🔍 useSession status:", status);
    console.log("🔐 useSession data:", session);
  }, [session, status]);

  if (status === "loading") return <p>Yükleniyor...</p>;
  if (status === "unauthenticated") return <p>Oturum yok!</p>;

  return (
    <div className="p-10">
      <h1>Dashboard</h1>
      <p>Hoş geldin: {session?.user?.name || session?.user?.email}</p>
      <p>Rollerin: {session?.user?.roles?.join(", ")}</p>
    </div>
  );
}
