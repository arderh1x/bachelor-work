import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';
import type { User } from '@shared/types';

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (userData: User) => void;
    logout: () => void;
    toggleProducerMode: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const res = await authApi.refresh();
            setUser(res.data.user);
        } catch (error) {
            console.error("Failed to check auth:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();

        const interval = setInterval(async () => {
            try {
                const res = await authApi.refresh();
                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                setUser(null);
            }
        }, 15 * 60 * 1000); // 15 хвилин

        return () => clearInterval(interval);
    }, [checkAuth]);

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
        <AuthContext.Provider value={{ user, setUser, login, logout, toggleProducerMode, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;