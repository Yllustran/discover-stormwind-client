import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsePlaceActions from "../../../hooks/places/UsePlaceActions";
import UseCategories from "../../../hooks/categories/UseCategories"; 
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

const PlaceCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createPlace } = UsePlaceActions();
  const { categories, loading: categoriesLoading, error: categoriesError } = UseCategories(); 
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name.trim() || !latitude || !longitude || !category_id) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("category_id", category_id);
    if (image) {
      formData.append("image", image);
    }

    const response = await createPlace(formData);

    if (response?.success) {
      alert("Place créée avec succès !");
      navigate("/places");
    } else {
      setError(response?.message || "Une erreur est survenue.");
    }

    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center royal-blue">Créer une Place</h2>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {categoriesError && <Alert variant="danger" className="text-center">{categoriesError}</Alert>}

      <Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded">
        <Form.Group className="mb-3">
          <Form.Label>Nom de la Place *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Parc Central"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Décrivez la place"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Latitude *</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Ex: 48.8566"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Longitude *</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Ex: 2.3522"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Catégorie *</Form.Label>
          {categoriesLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <Form.Select value={category_id} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate("/places")}>
            Annuler
          </Button>
          <Button className="regular-btn" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : "Créer"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default PlaceCreate;
