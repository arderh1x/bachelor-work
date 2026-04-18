import { useEffect, useState, useCallback } from 'react';
import { furnitureApi } from '@/api/furniture';
import type { Furniture } from '@shared/types';
import { FurnAddForm } from './FurnAddForm';
import { FurnList } from './FurnList';
import styles from './Furniture.module.css';

export const FurnInventory = () => {
    const [furniture, setFurniture] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFurniture = useCallback(async () => {
        setLoading(true);
        try {
            const data = await furnitureApi.getMyFurniture();
            setFurniture(data);
        } catch (error) {
            console.error('Помилка при завантаженні:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Ви впевнені, що хочете видалити цей товар?')) return;

        try {
            await furnitureApi.delete(id);
            fetchFurniture();
        } catch (error) {
            alert('Не вдалося видалити товар');
        }
    };

    useEffect(() => {
        fetchFurniture();
    }, [fetchFurniture]);

    return (
        <div className={styles.inventoryContainer}>
            <section className={styles.formSection}>
                <h2>Додати новий виріб</h2>
                <FurnAddForm onSuccess={fetchFurniture} />
            </section>

            <section className={styles.listSection}>
                <FurnList
                    items={furniture}
                    loading={loading}
                    onDelete={handleDelete}
                    onRefresh={fetchFurniture}
                />
            </section>
        </div>
    );
};