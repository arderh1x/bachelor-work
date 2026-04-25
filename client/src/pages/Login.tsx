import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { authApi } from '@/api/authApi';
import { isAxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import type { LoginDTO } from '@shared/types';

function Login() {
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
            navigate('/');
        } catch (error) {
            console.error("[Login] Failed to login:", error);
            let message = t('errors.update_failed');
            if (isAxiosError(error)) message = error.response?.data?.error || error.message;
            showToast(message, 'error');
        } finally { setIsSubmitting(false) }
    };

    return (
        <Container maxWidth="xs" className="fade-in page-container-auth">
            <Box component="article" className="app-card auth-card">
                <Typography variant="h5" className="page-title" align="center">
                    {t('nav.login')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} className="form-container-padding">
                    <Box className="form-stack">
                        <TextField onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            variant="outlined" value={formData.username} label={t('profile.username')}
                            disabled={isSubmitting} fullWidth required />

                        <TextField type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            variant="outlined" value={formData.password} label={t('profile.password')}
                            disabled={isSubmitting} fullWidth required />

                        <Button type="submit" variant="contained" disabled={isSubmitting}
                            fullWidth className="btn-base">
                            {isSubmitting ? t('common.loading') : t('nav.login')}
                        </Button>
                    </Box>

                    <Box className="auth-footer">
                        <Typography variant="body2" color="textSecondary">
                            {t('auth.no_account')}{' '}
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