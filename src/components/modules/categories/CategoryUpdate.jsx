import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import UseCategoryActions from "../../../hooks/categories/UseCategoryActions";
import CategoryService from "../../../services/CategoryService";

const CategoryUpdate = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { updateCategory } = UseCategoryActions();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger la catégorie à modifier
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const response = await CategoryService.getById(id);
      if (response.success) {
        setName(response.data.name);
      } else {
        setError(response.message || "Erreur lors de la récupération de la catégorie.");
      }
      setLoading(false);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const response = await updateCategory(id, { name });
  
    if (response?.success) { 
      alert("Catégorie mise à jour avec succès !");
      navigate("/categories"); 
    } else {
      alert(response?.message || "Une erreur est survenue.");
    }
  
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center royal-blue"> Update Category </h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded">
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate("/categories")}>
              cancel
            </Button>
            <Button className="regular-btn" type="submit">
              update
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default CategoryUpdate;
