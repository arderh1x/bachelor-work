import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { authApi } from '@/api/authApi';
import { isAxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast'; // Новий хук
import type { LoginDTO } from '@shared/types';

const Login = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState<LoginDTO>({ username: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await authApi.login(formData);
            login(response.data.user);
            // Видаляємо setError('') та показуємо успіх, якщо потрібно
            navigate('/');
        } catch (err: unknown) {
            let message = t('errors.update_failed');
            if (isAxiosError(err)) {
                message = err.response?.data?.error || err.message;
            }
            showToast(message, 'error'); // Глобальний тост
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" className="fade-in page-container-auth">
            <Box component="article" className="app-card auth-card">
                <Typography variant="h5" className="page-title" align="center" gutterBottom>
                    {t('nav.login')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} className="form-stack">
                    <TextField
                        fullWidth
                        label={t('profile.username') || "Username"}
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                        disabled={isSubmitting}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label={t('profile.password') || "Password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={isSubmitting}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        className="btn-base"
                        disabled={isSubmitting}
                        sx={{ mt: 1 }}
                    >
                        {isSubmitting ? t('common.loading') : t('nav.login')}
                    </Button>

                    <Box className="auth-footer">
                        <Typography variant="body2" color="textSecondary">
                            {t('auth.no_account')} {' '}
                            <Link to="/register" className="auth-link">
                                {t('auth.register_link')}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;