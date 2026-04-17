import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            setMessage('Registration is successful! Now log in...');
            setTimeout(() => navigate('/login'), 1000);
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Registration error.');
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
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default Register;