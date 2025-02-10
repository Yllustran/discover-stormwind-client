import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/UseAuth";
import { Container, Card, Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authFetch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category Name can't be empty");
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authFetch("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    setLoading(false);

    if (response.success) {
      alert(" Category Created !");
      navigate("/categories");
    } else {
      setError(response.message || "Une erreur est survenue.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h3 className="text-center royal-blue mb-4"> Create a new category </h3>

              {/* Gestion des erreurs */}
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Category name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: Merchant"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button type="submit" className="regular-btn" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Créer"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryCreate;
