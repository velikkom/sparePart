import axios from "axios";

const API_URL = "http://localhost:8080/api/firms";

// ✅ Get all firms
export const getAllFirms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firmalar listelenemedi");
  }
};

// ✅ Create a new firm
export const createFirm = async (firmData) => {
  try {
    const response = await axios.post(API_URL, firmData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma kaydedilemedi");
  }
};

// ✅ Update a firm
export const updateFirm = async (id, firmData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, firmData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma güncellenemedi");
  }
};

// ✅ Delete a firm
export const deleteFirm = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Firma silinemedi");
  }
};
