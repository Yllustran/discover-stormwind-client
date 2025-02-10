import LoginForm from "../modules/loginform/LoginForm";

function LoginPage() {
    const handleLoginSuccess = () => {
        console.log("Utilisateur connecté !");
        // Redirige ou met à jour l'interface
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;
