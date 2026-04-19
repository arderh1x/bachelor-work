import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import type { User } from '@shared/types'

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    toggleProducerMode: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const res = await authApi.refresh();
                setUser(res.data.user);
            } catch (error) {
                console.error(error)
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();

        const interval = setInterval(async () => {
            try {
                const res = await authApi.refresh();
                setUser(res.data.user);
                console.log("Token was successfully auto-refreshed.");
            } catch (error) {
                console.error("Failed to refresh token:", error);
                setUser(null);
            }
        }, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);


    const login = (userData: User) => setUser(userData);

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            setUser(null);
        }
    };

    const toggleProducerMode = async () => {
        try {
            const res = await authApi.toggleMode();
            setUser(prev => prev ? {
                ...prev,
                is_producer_mode: res.data.is_producer_mode
            } : null);

        } catch (err) {
            console.error("Error toggling mode:", err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, toggleProducerMode, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };