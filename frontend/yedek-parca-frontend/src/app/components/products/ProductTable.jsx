"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import ProductService from "@/service/ProductService";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { products, totalRecords } = await ProductService.getProducts(
          first / rows,
          rows
        );
        setProducts(products);
        setTotalRecords(totalRecords);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [first, rows]);

  const formatCurrency = (value) => `${value.toLocaleString("tr-TR")} ₺`;

  const priceBodyTemplate = (product) => formatCurrency(product.price);

  const stockStatusTemplate = (product) => (
    <Tag
      value={product.stock > 0 ? "Mevcut" : "Tükenmiş"}
      severity={getSeverity(product)}
    />
  );

  const getSeverity = (product) => {
    if (product.stock > 10) return "success";
    if (product.stock > 0) return "warning";
    return "danger";
  };

  const actionTemplate = (product) => (
    <Button
      icon="pi pi-shopping-cart"
      className="p-button-rounded"
      disabled={product.stock === 0}
    />
  );

  const header = (
    <div className="flex justify-content-between align-items-center">
      <span className="text-xl text-900 font-bold">Ürünler</span>
      <Button icon="pi pi-refresh" onClick={() => setFirst(0)} />
    </div>
  );

  return (
    <div className="card">
      <DataTable
        value={products}
        header={header}
        loading={loading}
        paginator
        rows={rows}
        first={first}
        totalRecords={totalRecords}
        onPage={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Ürün Adı" />
        <Column field="category" header="Kategori" />
        <Column field="price" header="Fiyat" body={priceBodyTemplate} />
        <Column field="stock" header="Stok" body={stockStatusTemplate} />
        <Column header="Sepete Ekle" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default ProductTable;
