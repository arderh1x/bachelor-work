import React, { useState } from 'react';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer'
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData);
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Помилка реєстрації');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Реєстрація RedS7</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="text" placeholder="Ім'я користувача" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    required 
                />
                <input 
                    type="email" placeholder="Email" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                />
                <input 
                    type="password" placeholder="Пароль" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    required 
                />
                <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="buyer">Я покупець</option>
                    <option value="producer">Я виробник (Producer)</option>
                </select>
                <button type="submit">Зареєструватися</button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('успішно') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default Register;