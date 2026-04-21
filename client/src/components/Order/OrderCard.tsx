import { type OrderWithDetails, OrderStatus } from '@shared/types';
import styles from './OrderCard.module.css';

interface OrderCardProps {
    order: OrderWithDetails;
    mode: 'customer' | 'producer';
    onStatusChange?: (id: number, newStatus: OrderStatus) => void;
}

export const OrderCard = ({ order, mode, onStatusChange }: OrderCardProps) => {
    const isProducer = mode === 'producer';

    const date = new Date(order.created_at).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`${styles.card} ${styles[order.status.toLowerCase().replace('-', '')]}`}>
            <div className={styles.header}>
                <span className={styles.orderId}>Замовлення №{order.id}</span>
                <span className={styles.date}>{date}</span>
            </div>

            <div className={styles.body}>
                <h3 className={styles.furnitureName}>
                    {order.furniture?.name || 'Індивідуальний проєкт'}
                </h3>

                <div className={styles.details}>
                    <p><strong>Ціна за одиницю:</strong> {order.price_at_order} грн</p>
                    <p><strong>Кількість:</strong> {order.quantity} шт.</p>
                    <p className={styles.totalPrice}><strong>Сума:</strong> {order.total_price} грн</p>
                    <p><strong>Адреса доставки:</strong> {order.delivery_address}</p>
                    {order.comment && <p className={styles.comment}>💬 {order.comment}</p>}
                </div>

                <hr className={styles.divider} />

                <div className={styles.contactInfo}>
                    {isProducer ? (
                        <>
                            <p><strong>Клієнт:</strong> {order.customer?.username || 'Гість'}</p>
                            <p><strong>Телефон:</strong> <a href={`tel:${order.phone}`}>{order.phone}</a></p>
                        </>
                    ) : (
                        <>
                            <p><strong>Майстерня:</strong> {order.producer?.workshop_name || order.producer?.username}</p>
                        </>
                    )}
                    <p><strong>Статус:</strong> <span className={styles.statusText}>{order.status}</span></p>
                </div>
            </div>

            {isProducer && (
                <div className={styles.actions}>
                    {order.status === OrderStatus.PENDING && (
                        <>
                            <button
                                className={styles.acceptBtn}
                                onClick={() => onStatusChange?.(order.id, OrderStatus.ACCEPTED)}
                            >
                                Прийняти
                            </button>
                            <button
                                className={styles.rejectBtn}
                                onClick={() => onStatusChange?.(order.id, OrderStatus.REJECTED)}
                            >
                                Відхилити
                            </button>
                        </>
                    )}

                    {order.status === OrderStatus.ACCEPTED && (
                        <button
                            className={styles.progressBtn}
                            onClick={() => onStatusChange?.(order.id, OrderStatus.IN_PROGRESS)}
                        >
                            Почати виготовлення
                        </button>
                    )}

                    {order.status === OrderStatus.IN_PROGRESS && (
                        <button
                            className={styles.shippedBtn}
                            onClick={() => onStatusChange?.(order.id, OrderStatus.SHIPPED)}
                        >
                            Відправлено клієнту
                        </button>
                    )}

                    {order.status === OrderStatus.SHIPPED && (
                        <button
                            className={styles.completeBtn}
                            onClick={() => onStatusChange?.(order.id, OrderStatus.COMPLETED)}
                        >
                            Завершити замовлення
                        </button>
                    )}

                    {[OrderStatus.ACCEPTED, OrderStatus.IN_PROGRESS, OrderStatus.SHIPPED].includes(order.status) && (
                        <button
                            className={styles.cancelBtn}
                            onClick={() => onStatusChange?.(order.id, OrderStatus.CANCELLED)}
                        >
                            Скасувати
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};