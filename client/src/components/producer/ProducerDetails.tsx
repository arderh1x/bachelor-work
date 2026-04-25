import { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import ProfileCard from '@/components/profile/ProfileCard';
import FurnitureList from '@/components/furniture/FurnitureList';
import OrderModal from '@/components/order/OrderModal';
import type { Furniture, Producer } from '@shared/types';

interface ProducerDetailsProps {
    producer: Producer;
    items: Furniture[];
    loading: boolean;
    isOwner: boolean;
}

function ProducerDetails({ producer, items, loading, isOwner }: ProducerDetailsProps) {
    const { t } = useLang();
    const { showToast } = useToast();
    const { user } = useAuth();

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedFurniture, setSelectedFurniture] = useState<Furniture | null>(null);

    const isProducerMode = user?.is_producer_mode;

    const handleOpenCustomOrder = () => {
        setSelectedFurniture(null);
        setIsOrderModalOpen(true);
    };

    const handleOpenItemOrder = (item: Furniture) => {
        setSelectedFurniture(item);
        setIsOrderModalOpen(true);
    };

    return (
        <Box component="main" className="page-container fade-in">
            <ProfileCard variant="header" profile={producer} isEditable={isOwner} />

            <Box className="section-header">
                <Box className="flex-between">
                    <Box>
                        <Typography variant="h4" className="page-title">
                            {t('producer.catalog_title')}
                        </Typography>

                        <Typography variant="body1" color="textSecondary">
                            {t('producer.catalog_subtitle')}
                        </Typography>
                    </Box>

                    {!isProducerMode && (
                        <Button onClick={handleOpenCustomOrder} variant="contained" color="primary"
                            startIcon={<Plus size={20} />} className="btn-base">
                            {t('producer.order_custom')}
                        </Button>
                    )}
                </Box>

                <Divider className="divider-std" />
            </Box>

            <FurnitureList onOrder={!isProducerMode ? handleOpenItemOrder : undefined}
                onEdit={isOwner ? (item) => console.log('Edit', item) : undefined}
                onDelete={isOwner ? (id) => console.log('Delete', id) : undefined}
                mode={isOwner ? 'producer' : 'customer'} items={items} loading={loading} />

            {!isProducerMode && (
                <OrderModal onSuccess={(msg) => showToast(msg, 'success')}
                    onError={(msg) => showToast(msg, 'error')}
                    onClose={() => setIsOrderModalOpen(false)} open={isOrderModalOpen}
                    producerId={producer.user_id} furnitureItem={selectedFurniture} />
            )}
        </Box>
    );
};

export default ProducerDetails;