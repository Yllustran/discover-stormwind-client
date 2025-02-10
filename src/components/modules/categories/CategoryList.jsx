import { Container, Row, Col, Card, Button, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Importer pour la navigation
import UseCategories from "../../../hooks/categories/UseCategories";
import UseCategoryActions from "../../../hooks/categories/UseCategoryActions";
import { useState } from "react";

const CategoryList = () => {
  const { categories, setCategories, loading, error } = UseCategories();
  const { deleteCategory } = UseCategoryActions();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate(); // ✅ Hook de navigation

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    setDeletingId(id);
    const response = await deleteCategory(id);

    if (response?.success) {
      setCategories(categories.filter((category) => category.id !== id));
    } else {
      alert(response?.message || "Une erreur est survenue.");
    }

    setDeletingId(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <h2 className="royal-blue fw-bold"> Categories </h2>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          ❌ {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                {categories.length > 0 ? (
                  <ListGroup variant="flush">
                    {categories.map((category) => (
                      <ListGroup.Item key={category.id} className="d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">{category.name}</span>
                        <div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => navigate(`/categories/edit/${category.id}`)}
                          >
                            Update
                          </Button>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                            disabled={deletingId === category.id}
                          >
                            {deletingId === category.id ? (
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
                  <p className="text-center text-muted mb-0">Zero categories</p>
                )}
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end mt-3">
              <Button className="regular-btn" onClick={() => navigate("/categories/new")}>
                Add a new Category
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CategoryList;
