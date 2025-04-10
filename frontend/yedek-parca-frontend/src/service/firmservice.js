// src/services/firmservice.js

import axiosInstance from "@/helpers/data/axiosInstance";



// import axiosInstance from "@/helpers/api/axiosInstance";

const API_URL = "/firms";

// ✅ Tüm firmaları getir
export const getAllFirms = async () => {
  try {
    const response = await axiosInstance.get("/firms");
    return response.data;
  } catch (error) {
    console.error("Firmalar yüklenemedi:", error);
    throw error; // Hata gösterimi için yukarı fırlat
  }
};

// ✅ ID ile firma getir
export const getFirmById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma bulunamadı");
  }
};

// ✅ Yeni firma oluştur
export const createFirm = async (firmData) => {
  try {
    const response = await axiosInstance.post(API_URL, firmData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma kaydedilemedi");
  }
};

// ✅ Firma güncelle
export const updateFirm = async (id, firmData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, firmData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma güncellenemedi");
  }
};

// ✅ Firma sil
export const deleteFirm = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma silinemedi");
  }
};
