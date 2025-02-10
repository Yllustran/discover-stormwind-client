import { Navbar, Nav, Button, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/UseAuth";
import Logo from '../../../assets/images/logo.png';

const NavigationBar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="px-4">
      <Container className="d-flex justify-content-between align-items-center w-100">
        

        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="60" height="60" className="me-2" />
        </Navbar.Brand>

        <Nav className="mx-auto">
          <Nav.Link href="/"> Discover Stormwind</Nav.Link>
          <Nav.Link href="/blog"> Blog</Nav.Link>

          {isAuthenticated() && (
            <NavDropdown title=" Admin Panel" id="admin-dropdown">
              <NavDropdown.Item onClick={() => navigate("/categories")}> Catégories </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/places")}> Places </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/blog-admin")}> Articles </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>

        <Nav>
          {isAuthenticated() ? (
            <>
              <Navbar.Text className="me-3">👤 {user?.email}</Navbar.Text>
              <Button className="regular-btn" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button className="regular-btn" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
