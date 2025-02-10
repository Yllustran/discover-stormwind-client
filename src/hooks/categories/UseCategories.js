import { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";

const UseCategories = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll();

        if (response.success) {
          setCategories(response.data); 
        } else {
          setError(response.message || "Erreur lors du chargement des catégories");
          setCategories([]); 
        }
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des catégories");
        setCategories([]);  
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error, setCategories };
};

export default UseCategories;
