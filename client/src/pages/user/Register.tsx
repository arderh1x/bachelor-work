import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import styles from './Auth.module.css';
import type { StatusMessage, RegisterDTO } from '@shared/types';
import { StatusDisplay } from '@/components/StatusDisplay';
import { isAxiosError } from 'axios';

const Register = () => {
    const [formData, setFormData] = useState<RegisterDTO>({ username: '', email: '', password: '' });
    const [message, setMessage] = useState<StatusMessage>({ text: '', type: null });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: null });
        try {
            await authApi.register(formData);
            setMessage({
                text: 'Registration is successful! Now you can log in...',
                type: "success"
            });
            setTimeout(() => navigate('/login'), 1000);

        } catch (error: unknown) {
            let errorMessage = 'Registration error.';
            if (isAxiosError(error)) errorMessage = error.response?.data?.error || error.message || errorMessage;
            else if (error instanceof Error) errorMessage = error.message;

            setMessage({
                text: errorMessage,
                type: 'error'
            });
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit" className={styles.submitBtn}>Register</button>
            </form>
            <StatusDisplay message={message} />
        </div>
    );
};

export default Register;