import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import UsePlaceActions from "../../../hooks/places/UsePlaceActions";
import PlaceService from "../../../services/PlaceService";

const PlaceUpdate = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const { updatePlace } = UsePlaceActions();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger la place à modifier
  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      const response = await PlaceService.getById(id);
      if (response.success) {
        setName(response.data.name);
        setDescription(response.data.description || "");
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
        setCategoryId(response.data.category_id);
      } else {
        setError(response.message || "Erreur lors de la récupération de la place.");
      }
      setLoading(false);
    };
    fetchPlace();
  }, [id]);

  // Gérer l'upload de fichier
  const handleFileChange = (event) => {
    setImage(event.target.files[0]); 
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("category_id", category_id);
    if (image) {
        formData.append("image", image);
    }

    const response = await updatePlace(id, formData);

    if (response?.success) {
        alert("Place mise à jour avec succès !");
        navigate("/places");
    } else {
        alert(response?.message || "Une erreur est survenue.");
    }

    setLoading(false);
};


  return (
    <Container className="mt-5">
      <h2 className="text-center royal-blue">Update Place</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded">
          <Form.Group className="mb-3">
            <Form.Label>Place Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter place name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter category ID"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate("/places")}>
              Cancel
            </Button>
            <Button className="regular-btn" type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default PlaceUpdate;
