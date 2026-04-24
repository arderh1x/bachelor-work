import { useEffect, useState, useMemo } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { profilesApi } from '@/api/profilesApi';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast'; // Використовуємо новий хук
import type { Producer } from '@shared/types';
import { ProducerCard } from './ProducerCard';

export const ProducersList = () => {
    const { user } = useAuth();
    const { t } = useLang();
    const { showToast } = useToast();

    const [producers, setProducers] = useState<Producer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        profilesApi.getAllProducers()
            .then(data => setProducers(data))
            .catch(() => {
                showToast(t('errors.fetch_producers'), 'error');
            })
            .finally(() => setLoading(false));
    }, [t, showToast]);

    // Виключаємо поточного користувача зі списку, якщо він сам є виробником
    const filteredProducers = useMemo(() => {
        if (!user) return producers;
        return producers.filter(p => p.user_id !== user.id);
    }, [producers, user]);

    if (loading) return (
        <Box className="loading-centered">
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Box className="fade-in">
            {filteredProducers.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredProducers.map(p => (
                        <Grid item xs={12} sm={6} md={4} key={p.user_id}>
                            <ProducerCard producer={p} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box className="empty-state-wrap">
                    <Typography className="empty-text">
                        {t('home.no_producers')}
                    </Typography>
                </Box>
            )}

            {/* Компонент Toast видалено, він тепер викликається через Context */}
        </Box>
    );
};