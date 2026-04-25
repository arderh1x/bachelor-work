import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { furnitureApi } from '@/api/furnitureApi';
import { profilesApi } from '@/api/profilesApi';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import type { Furniture, Producer } from '@shared/types';
import ProducerDetails from '../components/producer/ProducerDetails';

function ProducerDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { t } = useLang();
    const { showToast } = useToast();
    const { user } = useAuth();

    const [producer, setProducer] = useState<Producer | null>(null);
    const [items, setItems] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);

    const isOwner = user?.id === Number(id);

    useEffect(() => {
        if (!id) return;
        const producerId = Number(id);
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            try {
                const [profileData, furnitureData] = await Promise.all([
                    profilesApi.getById(producerId),
                    furnitureApi.getByProducer(producerId)
                ]);

                if (isMounted) {
                    setProducer(profileData);
                    setItems(furnitureData);
                }
            } catch (error) {
                console.error("[ProducerDetailsPage] Failed to load producer details:", error);
                if (isMounted) showToast(t('errors.fetch_producers'), 'error');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, [id, t, showToast]);

    if (loading) {
        return (
            <Box className="loading-centered">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box component="section" className="fade-in">
            {producer ? (
                <ProducerDetails producer={producer} items={items} loading={loading} isOwner={isOwner} />
            ) : (
                <Box className="page-container">
                    <Box className="empty-state-wrap">
                        <Typography color="textSecondary">
                            {t('errors.profile_not_found')}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ProducerDetailsPage;