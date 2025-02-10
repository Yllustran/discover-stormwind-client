import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import AuthService from "../../../services/AuthService";

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await AuthService.login(email, password);
        if (result.success) {
            setIsLoggedIn(true);
            if (onLoginSuccess) onLoginSuccess();

            setTimeout(() => {
                setIsLoggedIn(false);
                navigate("/"); 
            }, 1500);
        } else {
            setError(result.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} sm={10} md={6} lg={4} className="mx-auto">
                    <Card className="shadow p-4">
                        <Card.Body>
                            <h2 className="text-center royal-blue mb-4">Connexion</h2>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {isLoggedIn && <Alert variant="success">✅ Connexion réussie ! Redirection...</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="MySuperEmail"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="MySuperPassword"
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" className="w-75 mt-3 regular-btn">
                                    Se connecter
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
