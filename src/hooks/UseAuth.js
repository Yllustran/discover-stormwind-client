import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // ✅ Supprime `userToken`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // ✅ Utilise uniquement `token`
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedToken && storedUserEmail) {
      setToken(storedToken);
      setUser({ email: storedUserEmail });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token.token); 
        localStorage.setItem("userEmail", data.user.email);

        setToken(data.access_token.token);
        setUser({ email: data.user.email });

        return { success: true, user: data.user };
      } else {
        setError(data.message || "Erreur d'authentification");
        return { success: false, message: data.message || "Erreur d'authentification" };
      }
    } catch (error) {
      setError("Une erreur s'est produite");
      return { success: false, message: "Une erreur s'est produite" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userEmail");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    const storedToken = localStorage.getItem("token"); 
    return !!storedToken;
  };

  const authFetch = async (url, options = {}) => {
    const storedToken = localStorage.getItem("token"); 

    if (!storedToken) return { success: false, message: "Utilisateur non authentifié" };

    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    try {
      const response = await fetch(`${API_URL}${url}`, { ...options, headers });
      const data = await response.json();

      return response.ok ? { success: true, data } : { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Une erreur s'est produite" };
    }
  };

  return { user, token, loading, error, login, logout, isAuthenticated, authFetch };
};

export default useAuth;
