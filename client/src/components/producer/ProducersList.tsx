import { useEffect, useState, useMemo } from 'react';
import { Typography, Box, CircularProgress, Grid2 } from '@mui/material';
import { profilesApi } from '@/api/profilesApi';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import type { Producer } from '@shared/types';
import ProducerCard from './ProducerCard';

function ProducersList() {
    const { user } = useAuth();
    const { t } = useLang();
    const { showToast } = useToast();

    const [producers, setProducers] = useState<Producer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        profilesApi.getAllProducers()
            .then(data => setProducers(data))
            .catch(() => { showToast(t('errors.fetch_producers'), 'error') })
            .finally(() => setLoading(false));
    }, [t, showToast]);

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
                <Grid2 container spacing={3}>
                    {filteredProducers.map(p => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={p.user_id}>
                            <ProducerCard producer={p} />
                        </Grid2>
                    ))}
                </Grid2>

            ) : (
                <Box className="empty-state-wrap">
                    <Typography className="empty-text">
                        {t('home.no_producers')}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ProducersList;