const API_URL = "http://localhost:8000/api";

const AuthService = {

    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token and user email
                localStorage.setItem("token", data.access_token.token);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userToken", data.access_token.token); 

                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message || "Authentication error" };
            }
        } catch (error) {
            return { success: false, message: "An error occurred" };
        }
    },

    // Get the stored JWT token
    getToken() {
        return localStorage.getItem("token");
    },

    // Get the logged-in user's email
    getUserEmail() {
        return localStorage.getItem("userEmail");
    },

    //  Check if a user is authenticated
    isAuthenticated() {
        return !!this.getToken() && !!this.getUserEmail();
    },

    // Log out the user
    async logout() {
        const token = this.getToken();
        if (!token) return { success: false, message: "No user logged in" };

        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove user data after logout
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userToken");

            if (response.ok) {
                return { success: true, message: "Logout successful" };
            } else {
                const data = await response.json();
                return { success: false, message: data.message || "Logout error" };
            }
        } catch (error) {
            return { success: false, message: "An error occurred" };
        }
    },

    //  Make a request with JWT automatically added
    async authFetch(url, options = {}) {
        const token = this.getToken();
        if (!token) {
            return { success: false, message: "User not authenticated" };
        }

        const headers = {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(`${API_URL}${url}`, { ...options, headers });

            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, message: data.message || "Request error" };
            }
        } catch (error) {
            return { success: false, message: "An error occurred" };
        }
    },
};

export default AuthService;
