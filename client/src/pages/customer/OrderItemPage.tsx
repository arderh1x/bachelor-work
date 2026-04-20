import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { furnitureApi } from '@/api/furniture';
import { ordersApi } from '@/api/orders';
import type { Furniture, CreateOrderDTO } from '@shared/types';

import layout from './Layout.module.css';
import styles from './OrderCustom.module.css';
import { OrderForm, type OrderContactData } from '@/components/Order/OrderForm';

export const OrderItemPage = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const navigate = useNavigate();

    const [item, setItem] = useState<Furniture | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!itemId) return;
        furnitureApi.getById(Number(itemId))
            .then(data => setItem(data))
            .catch(() => alert('Товар не знайдено'))
            .finally(() => setLoading(false));
    }, [itemId]);

    const handleFinalSubmit = async (contactData: OrderContactData) => {
        if (!item) return;
        setIsSubmitting(true);

        const orderData: CreateOrderDTO = {
            producer_id: item.producer_id,
            furniture_id: item.id,
            ...contactData
        };

        try {
            await ordersApi.create(orderData);
            alert(`Замовлення на "${item.name}" успішно оформлено!`);
            navigate(`/producer/${item.producer_id}`);
        } catch (error) {
            console.log(error);
            alert('Помилка при створенні замовлення');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className={layout.pageContainer}>Завантаження...</div>;
    if (!item) return <div className={layout.pageContainer}>Товар не знайдено</div>;

    return (
        <div className={layout.pageContainer}>
            <div className={styles.orderCard}>
                <header className={styles.pageHeader}>
                    <h2>Оформлення замовлення</h2>
                    <p>Ви купуєте: <strong>{item.name}</strong></p>
                </header>

                <div className={styles.formContent}>
                    <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                        <p style={{ margin: 0 }}>Ціна за одиницю: <strong>{item.price} грн</strong></p>
                        {item.category && <small>Категорія: {item.category}</small>}
                    </div>

                    <OrderForm
                        onSubmit={handleFinalSubmit}
                        onCancel={() => navigate(-1)}
                        submitText={isSubmitting ? "Надсилаємо..." : "Підтвердити замовлення"}
                        showQuantity={true}
                    />
                </div>
            </div>
        </div>
    );
};