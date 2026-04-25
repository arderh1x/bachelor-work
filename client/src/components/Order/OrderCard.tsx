import { Box, Typography, Paper, Chip, Button, Divider, Stack, type ChipProps } from '@mui/material';
import { type OrderWithDetails, OrderStatus } from '@shared/types';
import { useLang } from '@/hooks/useLang';

interface OrderCardProps {
    order: OrderWithDetails;
    mode: 'customer' | 'producer';
    onStatusChange?: (id: number, newStatus: OrderStatus) => void;
}

function OrderCard({ order, mode, onStatusChange }: OrderCardProps) {
    const { t } = useLang();
    const isProducer = mode === 'producer';

    const date = new Date(order.created_at).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const getStatusColor = (status: OrderStatus): ChipProps['color'] => {
        switch (status) {
            case OrderStatus.PENDING: return 'warning';
            case OrderStatus.ACCEPTED: return 'info';
            case OrderStatus.IN_PROGRESS: return 'primary';
            case OrderStatus.SHIPPED: return 'secondary';
            case OrderStatus.COMPLETED: return 'success';
            case OrderStatus.CANCELLED: return 'error';
            default: return 'default';
        }
    };

    return (
        <Paper className="order-card app-card">
            <Box className="order-header">
                <Typography variant="subtitle2" color="textSecondary">
                    №{order.id} — {date}
                </Typography>
                <Chip label={t(`status.${order.status.toLowerCase()}`)}
                    color={getStatusColor(order.status)} size="small" />
            </Box>

            <Typography variant="h6" className="card-title">
                {order.furniture?.name || t('orders.custom_project')}
            </Typography>

            <Stack spacing={1} className="order-details-stack">
                <Typography variant="body2">
                    <strong>{t('inventory.price')}:</strong> {order.price_at_order} {t('common.currency')} x {order.quantity}
                </Typography>
                <Typography variant="body2">
                    <strong>{t('orders.phone')}:</strong> {order.phone}
                </Typography>
                <Typography variant="body2">
                    <strong>{t('orders.delivery_address')}:</strong> {order.delivery_address}
                </Typography>

                {order.comment && (
                    <Typography variant="body2" className="order-comment">
                        "{order.comment}"
                    </Typography>
                )}
            </Stack>

            {isProducer && onStatusChange && (
                <>
                    <Divider className="divider-std" />

                    <Box className="order-actions">
                        {order.status === OrderStatus.PENDING && (
                            <Button onClick={() => onStatusChange(order.id, OrderStatus.ACCEPTED)}
                                variant="contained" size="small" color="info" className="btn-base">
                                {t('orders.action.accept')}
                            </Button>
                        )}

                        {order.status === OrderStatus.ACCEPTED && (
                            <Button onClick={() => onStatusChange(order.id, OrderStatus.IN_PROGRESS)}
                                variant="contained" size="small" color="primary" className="btn-base">
                                {t('orders.action.start')}
                            </Button>
                        )}

                        {order.status === OrderStatus.IN_PROGRESS && (
                            <Button onClick={() => onStatusChange(order.id, OrderStatus.SHIPPED)}
                                variant="contained" size="small" color="secondary" className="btn-base">
                                {t('orders.action.ship')}
                            </Button>
                        )}

                        {order.status === OrderStatus.SHIPPED && (
                            <Button onClick={() => onStatusChange(order.id, OrderStatus.COMPLETED)}
                                variant="contained" size="small" color="success" className="btn-base">
                                {t('orders.action.complete')}
                            </Button>
                        )}

                        {![OrderStatus.COMPLETED, OrderStatus.CANCELLED].includes(order.status) && (
                            <Button onClick={() => onStatusChange(order.id, OrderStatus.CANCELLED)}
                                variant="outlined" size="small" color="error" className="btn-base">
                                {t('common.cancel')}
                            </Button>
                        )}
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default OrderCard;