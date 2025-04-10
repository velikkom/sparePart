"use client";

import useAuthGuard from "@/helpers/hooks/useAuthGuard";
import TahsilatEklePage from "./tahsilat-ekle-page";
import TahsilatListesiPage from "./tahsilat-list-page";


export default function Page() {
  
  useAuthGuard(["ROLE_PLASIYER"]);
  return (
    <div className="space-y-10 p-6">
      <TahsilatEklePage />
      <TahsilatListesiPage/>
    </div>
  );
}
