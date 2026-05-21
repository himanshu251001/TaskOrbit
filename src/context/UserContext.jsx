import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await apiFetch("/users");
            if (res && res.ok) {
                const data = await res.json();
                setUser(data.data);
                return data.data;
            }
            setUser(null);
            return null;
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
