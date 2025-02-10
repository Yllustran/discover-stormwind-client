import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/UseAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout(); // ✅ Déconnecte l'utilisateur
      navigate("/login"); // ✅ Redirige vers la page de connexion
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="text-center mt-5">
      <h2>Déconnexion...</h2>
      <p>Vous allez être redirigé vers la page de connexion.</p>
    </div>
  );
};

export default Logout;
