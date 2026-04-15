import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Перевіряємо, чи залогінений юзер при завантаженні сайту
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Замість /me викликаємо /refresh при кожному завантаженні сторінки
                const res = await api.get('/auth/refresh');
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Додатково: оновлюємо токен кожні 15 хвилин, поки вкладка відкрита
        const interval = setInterval(async () => {
            try {
                await api.get('/auth/refresh');
                console.log("Токен оновлено автоматично");
            } catch (err) {
                console.error("Не вдалося оновити токен");
            }
        }, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const login = (userData: any) => setUser(userData);

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};