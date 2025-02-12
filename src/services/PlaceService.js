import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Fonction pour récupérer le token d'authentification
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const PlaceService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/places`, { headers: getAuthHeaders() });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error fetching places" };
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/places/${id}`, { headers: getAuthHeaders() });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error fetching place" };
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/places`, data, { headers: getAuthHeaders() });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error creating place" };
    }
  },

  update: async (id, data) => {
    try {
        //  _method: 'PUT' pour que Laravel comprenne la requête comme un PUT
        data.append("_method", "PUT");

        const response = await axios.post(`${API_BASE_URL}/places/${id}`, data, {
            headers: getAuthHeaders(),
        });

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error updating place" };
    }
},


  delete: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/places/${id}`, { headers: getAuthHeaders() });
      return { success: true, message: "Place deleted successfully" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error deleting place" };
    }
  },
};

export default PlaceService;
