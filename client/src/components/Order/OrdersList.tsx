import { useEffect, useState, useCallback } from 'react';
import { ordersApi } from '@/api/orders';
import { type OrderWithDetails, OrderStatus } from '@shared/types';
import { OrderCard } from './OrderCard';
import layout from '@/styles/Layout.module.css';
import styles from './OrdersList.module.css';

interface OrderListProps {
    mode: 'customer' | 'producer';
}

export const OrderList = ({ mode }: OrderListProps) => {
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ordersApi.getMyOrders();
            setOrders(data);
        } catch (err) {
            console.error('Fetch orders error:', err);
            setError('Не вдалося завантажити замовлення. Спробуйте пізніше.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
        try {
            await ordersApi.updateStatus(id, newStatus);
            fetchOrders();
        } catch (err) {
            console.error('Update status error:', err);
            alert('Не вдалося оновити статус замовлення.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (loading) {
        return <div className={layout.pageContainer}>Завантаження замовлень...</div>;
    }

    if (error) {
        return (
            <div className={`${layout.pageContainer} ${styles.error}`}>
                <p>{error}</p>
                <button onClick={fetchOrders} className={styles.retryBtn}>Повторити спробу</button>
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            {orders.length > 0 ? (
                <div className={styles.grid}>
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            mode={mode}
                            onStatusChange={mode === 'producer' ? handleStatusChange : undefined}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>Замовлень не знайдено.</p>
                </div>
            )}
        </div>
    );
};