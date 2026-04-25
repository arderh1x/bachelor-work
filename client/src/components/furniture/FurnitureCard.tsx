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

function FurnitureCard({ item, mode, onDelete, onEdit, onOrder }: FurnitureCardProps) {
    const { t } = useLang();

    return (
        <Card className="app-card fade-in">
            <Box className="furn-img-wrap">
                {item.image_url ? (<img src={item.image_url} alt={item.name} className="img-cover" />)
                    : (
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

                <Typography variant="body2" className="producer-bio">
                    {item.description || t('home.no_bio')}
                </Typography>

                <Typography variant="h6" className="price-text-secondary" sx={{ mt: 2 }}>
                    {item.price.toLocaleString()} {t('common.currency')}
                </Typography>
            </CardContent>

            <CardActions className="furn-actions">
                {mode === 'producer' ? (
                    <>
                        <Button onClick={() => onEdit?.(item)} variant="outlined" startIcon={<Edit3 size={16} />}
                            className="btn-base" sx={{ flexGrow: 1 }}>
                            {t('common.edit')}
                        </Button>

                        <Button onClick={() => onDelete?.(item.id)} variant="outlined" color="error"
                            className="btn-base" sx={{ minWidth: '48px' }}>
                            <Trash2 size={16} />
                        </Button>
                    </>
                ) : (
                    onOrder && (
                        <Button onClick={() => onOrder(item)} variant="contained" startIcon={<ShoppingCart size={18} />}
                            className="btn-base" sx={{ flexGrow: 1 }}>
                            {t('common.buy')}
                        </Button>
                    )
                )}
            </CardActions>
        </Card>
    );
};

export default FurnitureCard;