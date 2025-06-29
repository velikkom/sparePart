"use client";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { initialProductState } from "@/helpers/initialState";
import ProductService from "@/service/ProductService";
import useAuthGuard from "@/helpers/hooks/useAuthGuard";
import useAuth from "@/helpers/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function AddProductPage() {
  useAuthGuard();
  const [product, setProduct] = useState(initialProductState);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "ADMIN") {
      router.push("/unauthorized"); // veya ana sayfa
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await ProductService.addProduct(product);
      setMessage({ text: "Ürün başarıyla eklendi!", type: "success" });
      setProduct(product);
    } catch (error) {
      setMessage({ text: "Ürün eklenirken bir hata oluştu!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Yeni Ürün Ekle</h1>

      {message.text && (
        <Message severity={message.type} text={message.text} className="mb-4" />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ürün Adı */}
          <div>
            <label className="block text-gray-700">Ürün Adı</label>
            <InputText
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-gray-700">Kategori</label>
            <InputText
              name="category"
              value={product.category}
              onChange={handleInputChange}
             className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Ürün Açıklaması */}
          <div className="col-span-2">
            <label className="block text-gray-700">Açıklama</label>
            <InputText
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Fiyat */}
          <div>
            <label className="block text-gray-700">Fiyat</label>
            <InputNumber
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.value || 0 })}
              mode="currency"
              currency="TRY"
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Stok */}
          <div>
            <label className="block text-gray-700">Stok</label>
            <InputNumber
              name="stock"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.value || 0 })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Minimum Stok */}
          <div>
            <label className="block text-gray-700">Min. Stok</label>
            <InputNumber
              name="minStockLevel"
              value={product.minStockLevel}
              onChange={(e) =>
                setProduct({ ...product, minStockLevel: e.value || 0 })
              }
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Firma ID */}
          <div>
            <label className="block text-gray-700">Firma ID</label>
            <InputNumber
              name="firmId"
              value={product.firmId}
              onChange={(e) => setProduct({ ...product, firmId: e.value || 0 })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Gönder Butonu */}
        <Button
          type="submit"
          label={loading ? "Ekleniyor..." : "Ürün Ekle"}
          icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
          disabled={loading}
          className="w-full h-10 bg-blue-500"
        />
      </form>
    </div>
  );
}
