import { Container, Card, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import UsePlaces from "../../../hooks/places/UsePlaces";
import UsePlaceActions from "../../../hooks/places/UsePlaceActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceList = () => {
  const { places, setPlaces, loading, error } = UsePlaces();
  const { deletePlace } = UsePlaceActions(); 
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette place ?")) return;

    setDeletingId(id);
    const response = await deletePlace(id);

    if (response?.success) {
      setPlaces(places.filter((place) => place.id !== id)); 
    } else {
      alert(response?.message || "Une erreur est survenue.");
    }

    setDeletingId(null);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center royal-blue fw-bold">Places</h2>

      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger" className="text-center">❌ {error}</Alert>}

      {!loading && !error && (
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            {places.length > 0 ? (
              <ListGroup variant="flush">
                {places.map((place) => (
                  <ListGroup.Item key={place.id} className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">{place.name}</span>
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/places/edit/${place.id}`)}
                      >
                        Update
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(place.id)}
                        disabled={deletingId === place.id}
                      >
                        {deletingId === place.id ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-center text-muted mb-0">Aucune place enregistrée.</p>
            )}
          </Card.Body>
        </Card>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Button className="regular-btn" onClick={() => navigate("/places/new")}>
          Ajouter une Place
        </Button>
      </div>
    </Container>
  );
};

export default PlaceList;
