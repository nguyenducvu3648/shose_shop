import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shose-shop.onrender.com/api/shoes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Shoe API functions
export const shoeAPI = {
  // Get all shoes
  getAllShoes: async () => {
    try {
      const response = await api.get('/shoes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch shoes');
    }
  },

  // Get shoe by model
  getShoeByModel: async (model) => {
    try {
      const response = await api.get(`/shoes/${model}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch shoe');
    }
  },

  // Add new shoe
  addShoe: async (shoeData) => {
    try {
      const response = await api.post('/shoes', shoeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add shoe');
    }
  },

  // Update shoe
  updateShoe: async (model, shoeData) => {
    try {
      const response = await api.put(`/shoes/${model}`, shoeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update shoe');
    }
  },

  // Delete shoe
  deleteShoe: async (model) => {
    try {
      await api.delete(`/shoes/${model}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete shoe');
    }
  },
};

export default api;
