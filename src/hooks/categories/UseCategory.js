import { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";

const UseCategory = (id) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getById(id);
        setCategory(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de la catégorie");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return { category, loading, error };
};

export default UseCategory;
