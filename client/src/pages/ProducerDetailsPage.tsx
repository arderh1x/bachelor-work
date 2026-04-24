import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { furnitureApi } from '@/api/furnitureApi';
import { profilesApi } from '@/api/profilesApi';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast'; // Новий хук
import type { Furniture, Producer } from '@shared/types';
import ProducerDetails from '../components/producer/ProducerDetails';

export default function ProducerDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { t } = useLang();
    const { showToast } = useToast();

    const [producer, setProducer] = useState<Producer | null>(null);
    const [items, setItems] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);

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
            } catch (err) {
                console.error("Producer data loading error:", err)
                if (isMounted) {
                    showToast(t('errors.fetch_producers'), 'error');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [id, t, showToast]);

    if (loading) {
        return (
            <Box className="loading-centered">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box component="main" className="page-container fade-in">
            {producer ? (
                <ProducerDetails
                    producer={producer}
                    items={items}
                    loading={loading}
                />
            ) : (
                <Box className="empty-state-wrap">
                    {/* Тут можна додати Typography з повідомленням, що виробника не знайдено */}
                </Box>
            )}
        </Box>
    );
}