import { Card, CardContent, Typography, Box, Button, Chip, CardActions } from '@mui/material';
import { ImageOff, Edit3, Trash2, ShoppingCart } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import type { Furniture } from '@shared/types';

interface FurnitureCardProps {
    item: Furniture;
    mode: 'producer' | 'customer';
    onDelete?: (id: number) => void;
    onEdit?: (item: Furniture) => void;
    onOrder?: (item: Furniture) => void;
}

export const FurnitureCard = ({ item, mode, onDelete, onEdit, onOrder }: FurnitureCardProps) => {
    const { t } = useLang();

    return (
        <Card className="app-card fade-in">
            <Box className="furn-img-wrap">
                {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="img-cover" />
                ) : (
                    <Box className="loading-centered" sx={{ flexDirection: 'column', gap: 1 }}>
                        <ImageOff size={40} color="#bdbdbd" />
                        <Typography variant="caption" color="textSecondary">
                            {t('common.no_photo')}
                        </Typography>
                    </Box>
                )}
                <Chip label={t(`categories.${item.category}`)} size="small" className="furn-type-tag" />
            </Box>

            <CardContent className="furn-content">
                <Box className="flex-between">
                    <Typography variant="h6" className="card-title">
                        {item.name}
                    </Typography>
                </Box>

                <Typography variant="body2" className="text-secondary-limit">
                    {item.description || t('home.no_bio')}
                </Typography>

                <Typography variant="h6" className="price-accent" style={{ marginTop: '16px' }}>
                    {item.price.toLocaleString()} {t('common.currency')}
                </Typography>
            </CardContent>

            <CardActions className="furn-actions">
                {mode === 'producer' ? (
                    <>
                        <Button onClick={() => onEdit?.(item)} variant="outlined" fullWidth
                            startIcon={<Edit3 size={16} />} className="btn-base">
                            {t('common.edit')}
                        </Button>

                        <Button onClick={() => onDelete?.(item.id)} variant="outlined"
                            style={{ minWidth: '48px' }} color="error" className="btn-base">
                            <Trash2 size={16} />
                        </Button>
                    </>
                ) : (

                    onOrder && (
                        <Button onClick={() => onOrder(item)} variant="contained" fullWidth
                            startIcon={<ShoppingCart size={18} />} className="btn-base">
                            {t('common.buy')}
                        </Button>
                    )
                )}
            </CardActions>
        </Card>
    );
};