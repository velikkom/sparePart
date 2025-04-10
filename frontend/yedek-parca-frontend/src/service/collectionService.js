import axiosInstance from "@/helpers/api/axiosInstance";

const API_URL = "/collections";

// ✅ Tahsilat ekle
export const addCollection = async (data) => {
  try {
    const response = await axiosInstance.post(API_URL, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Tahsilat kaydedilemedi");
  }
};

// ✅ Tüm tahsilatları getir (isteğe göre filtrelenebilir)
export const getCollections = async (params = {}) => {
  try {
    const response = await axiosInstance.get(API_URL, { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Tahsilatlar alınamadı");
  }
};

// ✅ ID ile tahsilat getir (opsiyonel)
export const getCollectionById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Tahsilat bulunamadı");
  }
};

// ✅ Tahsilat sil (opsiyonel)
export const deleteCollection = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Tahsilat silinemedi");
  }
};
