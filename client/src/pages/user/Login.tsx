import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth';
import styles from './Auth.module.css';
import type { StatusMessage, LoginDTO } from '@shared/types';
import { StatusDisplay } from '@/components/StatusDisplay';

const Login = () => {
    const [formData, setFormData] = useState<LoginDTO>({ username: '', password: '' });
    const [message, setMessage] = useState<StatusMessage>({ text: '', type: null });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: null });
        try {
            const response = await authApi.login(formData);
            login(response.data.user);
            navigate('/');
        } catch (error: any) {
            setMessage({
                text: error.response?.data?.error || 'Authorization error.',
                type: 'error'
            });
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>Authorization</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
            <StatusDisplay message={message} />
        </div>
    );
};

export default Login;