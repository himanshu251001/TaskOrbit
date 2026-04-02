import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getValidToken } from "../../utils/api";

const ProtectedRoute = () => {
    const [authState, setAuthState] = useState("checking");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getValidToken();
                console.log("token:", token);
                setAuthState(token ? "authenticated" : "unauthenticated");
            } catch (error) {
                console.error("Auth check failed:", error);
                setAuthState("unauthenticated");
            }
        };

        checkAuth();
    }, []);

    if (authState === "checking") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    return authState === "authenticated" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
