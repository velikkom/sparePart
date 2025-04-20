import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { firmValidationSchema } from "@/helpers/validationSchemas";
import { createFirm, updateFirm } from "@/service/firmservice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Swal from "sweetalert2";

const FirmForm = ({ fetchFirms, selectedFirm, setSelectedFirm }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      address: "",
      phone: "",
      taxNumber: "",
    },
    validationSchema: firmValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (values.id) {
          // ✅ Güncelleme işlemi
          await updateFirm(values.id, values);
          Swal.fire({
            icon: "success",
            title: "Başarılı!",
            text: "Firma başarıyla güncellendi.",
          });
        } else {
          // ✅ Yeni firma ekleme
          await createFirm(values);
          Swal.fire({
            icon: "success",
            title: "Başarılı!",
            text: "Firma başarıyla kaydedildi.",
          });
        }
        resetForm();
        setSelectedFirm(null);
        fetchFirms(); // Listeyi güncelle
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Hata!",
          text: error.message || "Bir hata oluştu.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // ✅ Düzenle butonuna tıklanınca formu doldur
  useEffect(() => {
    if (selectedFirm) {
      formik.setValues(selectedFirm);
    }
  }, [selectedFirm]);

  return (
    <div className="flex justify-center m-6 h-screen bg-gray-100">
      <div className="w-full max-w-md m-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {formik.values.id ? "Firma Güncelle" : "Firma Kaydet"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {["name", "address", "phone", "taxNumber"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {field === "name" && "Firma Adı"}
                {field === "address" && "Adres"}
                {field === "phone" && "Telefon"}
                {field === "taxNumber" && "Cari Hesap Kodu"}
                <span className="text-red-500">*</span>
              </label>
              <InputText
                name={field}
                value={formik.values[field] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  formik.touched[field] && formik.errors[field]
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <small className="text-red-500">{formik.errors[field]}</small>
              )}
            </div>
          ))}

          <Button
            type="submit"
            label={
              loading
                ? "Kaydediliyor..."
                : formik.values.id
                ? "Güncelle"
                : "Kaydet"
            }
            className={`w-full ${
              formik.values.id ? "bg-yellow-500" : "bg-green-500"
            } hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default FirmForm;
