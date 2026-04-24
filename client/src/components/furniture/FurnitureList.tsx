import { Box, CircularProgress, Typography, Grid2 } from '@mui/material';
import { FurnitureCard } from './FurnitureCard';
import { useLang } from '@/hooks/useLang';
import type { Furniture } from '@shared/types';

interface FurnitureListProps {
    items: Furniture[];
    loading: boolean;
    mode: 'producer' | 'customer';
    onDelete?: (id: number) => void;
    onEdit?: (item: Furniture) => void;
    onOrder?: (item: Furniture) => void;
}

export const FurnitureList = ({ items, loading, mode, onDelete, onEdit, onOrder }: FurnitureListProps) => {
    const { t } = useLang();

    if (loading) return (
        <Box className="loading-centered">
            <CircularProgress color="primary" />
        </Box>
    );

    if (items.length === 0) return (
        <Box className="empty-state-wrap">
            <Typography variant="body1">
                {t('common.no_items')}
            </Typography>
        </Box>
    );

    return (
        <Box className="fade-in">
            <Grid2 container spacing={3}>
                {items.map(item => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                        <FurnitureCard item={item} mode={mode}
                            onDelete={onDelete} onEdit={onEdit} onOrder={onOrder} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};