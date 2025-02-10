import { useState } from "react";
import CategoryService from "../../services/CategoryService";
import UseCategories from "./UseCategories";

const UseCategoryActions = () => {
  const { categories, setCategories } = UseCategories(); // Utilisation du contexte ou état global
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour créer une catégorie sans React Query
  const createCategory = async (data) => {
    setLoading(true);
    try {
      const newCategory = await CategoryService.create(data);
      setCategories([...categories, newCategory]); // Ajout de la nouvelle catégorie
      return newCategory; // Retourner la catégorie créée (optionnel)
    } catch (err) {
      setError(err.message || "Erreur lors de la création");
      console.error("Erreur lors de la création de la catégorie :", err);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, data) => {
    setLoading(true);
    try {
      const response = await CategoryService.update(id, data);
  
      if (response.success) {
        setCategories(
          categories.map((category) =>
            category.id === id ? response.data : category
          )
        );
        return { success: true, message: "Catégorie mise à jour avec succès." }; 
      } else {
        return { success: false, message: response.message || "Échec de la mise à jour." };
      }
    } catch (err) {
      return { success: false, message: err.message || "Erreur lors de la mise à jour." };
    } finally {
      setLoading(false);
    }
  };
  

  const deleteCategory = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    setLoading(true);
    try {
      const response = await CategoryService.delete(id);

      if (response.success) {
        setCategories(categories.filter((category) => category.id !== id));
        return { success: true, message: "Catégorie supprimée avec succès." };
      } else {
        return { success: false, message: response.message || "Échec de la suppression." };
      }
    } catch (err) {
      return { success: false, message: err.message || "Erreur lors de la suppression." };
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, updateCategory, deleteCategory, loading, error };
};

export default UseCategoryActions;
