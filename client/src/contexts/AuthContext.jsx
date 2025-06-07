// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getMe } from "@/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasFetchedRef = useRef(false);

    const fetchMe = async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        try {
            const data = await getMe();
            setUser(data.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refetchUser: fetchMe }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);