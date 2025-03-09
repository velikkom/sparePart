"use client";

import { useSession, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4 p-4">
      {session ? (
        <>
          <p className="text-gray-800">Hoş Geldin, {session.user.email}!</p>
          <button onClick={() => signOut()} className="bg-red-500 text-white py-1 px-3 rounded">
            Çıkış Yap
          </button>
        </>
      ) : (
        <p>Oturum Açılmadı</p>
      )}
    </div>
  );
}
