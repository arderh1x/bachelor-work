import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import type { StatusMessage } from '@shared/types';
import { StatusDisplay } from '@/components/StatusDisplay';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState<StatusMessage>({ text: '', type: null });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: null });
        try {
            await api.post('/auth/register', formData);
            setMessage({
                text: 'Registration is successful! Now you can log in...',
                type: "success"
            });
            setTimeout(() => navigate('/login'), 1000);
        } catch (error: any) {
            setMessage({
                text: error.response?.data?.error || 'Registration error.',
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
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
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