import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// LocalStorage'dan token alma fonksiyonu
const getAuthToken = () => localStorage.getItem("token");

const ProductService = {
  getProducts: async (page = 0, size = 5) => {
    const token = getAuthToken();
    try {
      const response = await axios.get(API_URL, {
        params: { page, size },
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("API Response:", response.data);

      return {
        products: response.data.data.content || [],
        totalRecords: response.data.data.totalElements || 0,
      };
    } catch (error) {
      console.error("Ürünleri getirirken bir hata oluştu:", error);
      throw error;
    }
  },
 
  addProduct: async (product) => {
    console.log("Gönderilen Product:", product);

    try {
      const response = await axios.put(`${API_URL}/add`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Ürün eklerken bir hata oluştu:", error);
      throw error;
    }
  },
};

export default ProductService;
