import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";

function UserInfo() {
    const [userData, setUserData] = useState({
        email: "",
        token: "",
    });

    useEffect(() => {
        // Récupère les informations depuis localStorage (ou une API si besoin)
        const storedEmail = localStorage.getItem("userEmail");
        const storedToken = localStorage.getItem("userToken");

        if (storedEmail && storedToken) {
            setUserData({ email: storedEmail, token: storedToken });
        }
    }, []);

    return (
        <Card className="p-3 shadow-sm">
            <h5 className="mb-2">👤 Utilisateur connecté :</h5>

            {userData.email ? (
                <>
                    <p>
                        <strong>Email :</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Token JWT :</strong> <Badge bg="secondary">{userData.token.slice(0, 10)}...</Badge>
                    </p>
                </>
            ) : (
                <p className="text-muted">⚠ Aucun utilisateur connecté</p>
            )}
        </Card>
    );
}

export default UserInfo;
