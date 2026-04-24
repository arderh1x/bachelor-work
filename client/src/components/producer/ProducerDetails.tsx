import { Box, Typography, Divider } from '@mui/material';
import { useLang } from '@/hooks/useLang';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { FurnitureList } from '@/components/furniture/FurnitureList';
import type { Furniture, Producer } from '@shared/types';
import { useNavigate } from 'react-router-dom';

interface ProducerDetailsProps {
    producer: Producer;
    items: Furniture[];
    loading: boolean;
}

const ProducerDetails = ({ producer, items, loading }: ProducerDetailsProps) => {
    const { t } = useLang();
    const navigate = useNavigate();

    return (
        <Box component="main" className="page-container fade-in">
            {/* Хедер профілю виробника */}
            <ProfileCard
                profile={producer}
                variant="header"
                isEditable={false}
            />

            {/* Заголовок каталогу */}
            <Box className="section-header">
                <Typography variant="h4" className="page-title">
                    {t('producer.catalog_title')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {t('producer.catalog_subtitle')}
                </Typography>
                <Divider className="divider-std" />
            </Box>

            {/* Список товарів */}
            <FurnitureList
                items={items}
                loading={loading}
                mode="customer"
                onOrder={(item) => navigate(`/order/item/${item.id}`)}
            />
        </Box>
    );
};

export default ProducerDetails;