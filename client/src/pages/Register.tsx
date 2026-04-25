import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { authApi } from '@/api/authApi';
import { isAxiosError } from 'axios';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import type { RegisterDTO } from '@shared/types';

function Register() {
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
            showToast(t('auth.register_success'), 'success');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            let message = t('errors.register_failed');
            if (isAxiosError(err)) message = err.response?.data?.error || err.message;
            showToast(message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" className="fade-in page-container-auth">
            <Box component="article" className="app-card auth-card">
                <Typography variant="h5" className="page-title" align="center">
                    {t('auth.registration_title')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} className="form-stack">
                    <TextField onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        value={formData.username} label={t('profile.username')} disabled={isSubmitting} fullWidth required />

                    <TextField type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email} label="Email" disabled={isSubmitting} fullWidth required />

                    <TextField type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password} label={t('profile.password')} disabled={isSubmitting} fullWidth required />

                    <Button type="submit" variant="contained" disabled={isSubmitting}
                        fullWidth className="btn-base">
                        {isSubmitting ? t('common.loading') : t('auth.register_button')}
                    </Button>

                    <Box className="auth-footer">
                        <Typography variant="body2">
                            {t('auth.have_account')} {' '}
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