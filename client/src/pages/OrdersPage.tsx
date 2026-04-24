import { Box, Typography } from '@mui/material';
import { OrdersList } from '@/components/order/OrdersList';
import { useLang } from '@/hooks/useLang';

interface Props {
    mode: 'customer' | 'producer';
}

const OrdersPage = ({ mode }: Props) => {
    const { t } = useLang();

    return (
        <Box component="main" className="page-container fade-in">
            {/* Секція заголовку */}
            <Box component="header" className="section-header">
                <Typography variant="h4" className="page-title">
                    {t('orders.title')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {mode === 'producer'
                        ? t('orders.producer_subtitle')
                        : t('orders.customer_subtitle')
                    }
                </Typography>
            </Box>

            {/* Список замовлень */}
            <OrdersList mode={mode} />
        </Box>
    );
};

export default OrdersPage;