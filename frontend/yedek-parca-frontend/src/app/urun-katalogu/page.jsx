"use client";
import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import ProductList from "../components/products/ProductList";
import Pagination from "../components/products/Pagination";
import { ProductService } from "@/service/ProductService";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [loading, setLoading] = useState(true);

  const onPageChange = (event) => {
    setFirst(event.first); // İlk sayfa indexini güncelle
    setRows(event.rows); // Her sayfadaki satır sayısını güncelle
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getProducts(first / rows, rows);
        setProducts(data.content);
        setTotalRecords(data.totalElements);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [first, rows]);
  return (
    <div
      className="card flex flex-col gap-4 p-4  "
      style={{ alignItems: "center" }}
    >
      <h1 className="text-2xl font-bold mb-4 ">Ürün Kataloğu</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <ProductList products={products} />
          <Pagination
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
