import axios from "axios";

const API_URL = "http://localhost:8080/api/products"; 

export const ProductService = {
    getProducts: async (page = 0, size = 5) => {
        try {
            const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
            return response.data.data.content; // Tüm ürünleri geri döndürür.
        } catch (error) {
            console.error("Ürünleri getirirken bir hata oluştu:", error);
            throw error;
        }
    }
};
