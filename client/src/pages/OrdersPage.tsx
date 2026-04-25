import { Box, Typography, Divider } from '@mui/material';
import { OrdersList } from '@/components/order/OrdersList';
import { useLang } from '@/hooks/useLang';

interface OrdersPageProps {
    mode: 'customer' | 'producer';
}

function OrdersPage({ mode }: OrdersPageProps) {
    const { t } = useLang();

    return (
        <Box component="main" className="page-container fade-in">
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

                <Divider className="divider-std" />
            </Box>

            <OrdersList mode={mode} />
        </Box>
    );
};

export default OrdersPage;