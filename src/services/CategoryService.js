import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Fonction pour récupérer le token d'authentification
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const CategoryService = {
  // 🔹 Récupérer toutes les catégories
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: getAuthHeaders(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur lors de la récupération des catégories." };
    }
  },

  // 🔹 Récupérer une catégorie par ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`, {
        headers: getAuthHeaders(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur lors de la récupération de la catégorie." };
    }
  },

  // 🔹 Créer une nouvelle catégorie
  create: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, data, {
        headers: getAuthHeaders(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur lors de la création de la catégorie." };
    }
  },

  // 🔹 Mettre à jour une catégorie existante
  update: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categories/${id}`, data, {
        headers: getAuthHeaders(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur lors de la mise à jour de la catégorie." };
    }
  },

  // 🔹 Supprimer une catégorie
  delete: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`, {
        headers: getAuthHeaders(),
      });
      return { success: true, message: "Catégorie supprimée avec succès." };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur lors de la suppression de la catégorie." };
    }
  },
};

export default CategoryService;
