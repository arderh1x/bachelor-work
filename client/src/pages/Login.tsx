import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Додай це всередині компонента

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Наш сервер запише JWT у куки автоматично завдяки withCredentials: true в axios.ts
            const response = await api.post('/auth/login', formData);
            setMessage(`Вітаємо, ${response.data.user.username}!`);
            login(response.data.user); // Оновлюємо стан глобально
            navigate('/');
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Помилка входу');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Вхід RedS7</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="email" placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password" placeholder="Пароль"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Увійти</button>
            </form>
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </div>
    );
};

export default Login;