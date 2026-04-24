import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { authApi } from '@/api/authApi';
import { isAxiosError } from 'axios';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast'; // Новий хук
import type { RegisterDTO } from '@shared/types';

const Register = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [formData, setFormData] = useState<RegisterDTO>({
        username: '',
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await authApi.register(formData);
            showToast(t('auth.register_success') || 'Registration successful!', 'success');

            // Невелика затримка перед перенаправленням, щоб користувач встиг побачити тост
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: unknown) {
            let message = t('errors.update_failed');
            if (isAxiosError(err)) {
                message = err.response?.data?.error || err.message;
            }
            showToast(message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" className="fade-in page-container-auth">
            <Box component="article" className="app-card auth-card">
                <Typography variant="h5" className="page-title" align="center" gutterBottom>
                    {t('auth.registration_title') || "Registration"}
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
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        {isSubmitting ? t('common.loading') : t('auth.register_button') || "Register"}
                    </Button>

                    <Box className="auth-footer">
                        <Typography variant="body2" color="textSecondary">
                            {t('auth.have_account') || "Already have an account?"} {' '}
                            <Link to="/login" className="auth-link">
                                {t('nav.login')}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;