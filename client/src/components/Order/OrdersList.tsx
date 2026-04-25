import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';
import { ordersApi } from '@/api/ordersApi';
import { type OrderWithDetails, OrderStatus } from '@shared/types';
import OrderCard from './OrderCard';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';

interface Props {
    mode: 'customer' | 'producer';
}

export const OrdersList = ({ mode }: Props) => {
    const { t } = useLang();
    const { showToast } = useToast();

    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await ordersApi.getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error("[OrdersList] Failed to fetch orders:", error);
            showToast(t('errors.fetch_failed'), 'error');
        } finally {
            setLoading(false);
        }
    }, [t, showToast]);

    const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
        try {
            await ordersApi.updateStatus(id, newStatus);
            showToast(t('orders.status_updated'), 'success');
            await fetchOrders();
        } catch (error) {
            console.error("[OrdersList] Failed to update order status:", error);
            showToast(t('errors.update_failed'), 'error');
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (isMounted) await fetchOrders();
        };
        loadData();

        return () => { isMounted = false };
    }, [fetchOrders]);

    if (loading) {
        return (
            <Box className="loading-centered">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box className="fade-in">
            {orders.length > 0 ? (
                <Stack spacing={2} className="orders-stack">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} mode={mode}
                            onStatusChange={mode === 'producer' ? handleStatusChange : undefined} />
                    ))}
                </Stack>

            ) : (
                <Box className="empty-state-wrap">
                    <Typography color="textSecondary" className="empty-text">
                        {t('orders.empty_list')}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default OrdersList;