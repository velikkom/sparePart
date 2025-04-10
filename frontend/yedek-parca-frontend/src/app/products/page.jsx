"use client";
import React from "react";
import ProductTable from "../components/products/ProductTable";
import useAuthGuard from "@/helpers/hooks/useAuthGuard";

export default function Page() {
  useAuthGuard();
  return (
    <div className="card p-4">
      <h1 className="text-2xl font-bold mb-4">Ürün Kataloğu</h1>
      <ProductTable />
    </div>
  );
}
