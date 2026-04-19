import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { furnitureApi } from '@/api/furniture';
import { FurnList } from '@/components/Furniture/FurnList';
import type { Furniture } from '@shared/types';
import styles from '@/components/Furniture/Furniture.module.css';

const CProducerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [items, setItems] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            furnitureApi.getByProducer(Number(id))
                .then(data => setItems(data))
                .catch(err => console.error("Помилка завантаження каталогу:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleOrder = (item: Furniture) => {
        // Поки що просто лог, пізніше зробимо модалку замовлення
        alert(`Ви обрали: ${item.name}. Функція замовлення в розробці.`);
    };

    return (
        <div className={styles.inventoryContainer}>
            <header style={{ marginBottom: '30px' }}>
                <h1>Каталог майстерні</h1>
                <p>Оберіть готові вироби майстра або надішліть запит на індивідуальне замовлення</p>
            </header>

            <FurnList
                items={items}
                loading={loading}
                mode="customer"
                onOrder={handleOrder}
            />
        </div>
    );
};

export default CProducerDetails;