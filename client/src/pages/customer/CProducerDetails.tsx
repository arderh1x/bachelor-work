import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { furnitureApi } from '@/api/furniture';
import { profilesApi } from '@/api/profiles';
import { FurnList } from '@/components/Furniture/FurnList';
import type { Furniture, Producer } from '@shared/types';
import styles from '@/components/Furniture/Furniture.module.css';
import { ProfileCard } from '../user/ProfileCard';

export default function CProducerDetails() {
    const { id } = useParams<{ id: string }>();
    const [producer, setProducer] = useState<Producer | null>(null);
    const [items, setItems] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const producerId = Number(id);
        let isMounted = true;

        Promise.all([
            profilesApi.getById(producerId),
            furnitureApi.getByProducer(producerId)
        ])
        .then(([profileData, furnitureData]) => {
            if (isMounted) {
                setProducer(profileData);
                setItems(furnitureData);
            }
        })
        .catch((err) => {
            console.error("Помилка завантаження даних майстерні:", err);
        })
        .finally(() => {
            if (isMounted) {
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleOrder = (item: Furniture) => {
        alert(`Ви обрали: ${item.name}. Функція замовлення в розробці.`);
    };

    return (
        <div className={styles.inventoryContainer}>
            {producer && (
                <div style={{ marginBottom: '40px' }}>
                    <ProfileCard profile={producer} isEditable={false} />
                </div>
            )}

            <header style={{ marginBottom: '30px' }}>
                <h2 className={styles.sectionTitle}>Каталог товарів</h2>
                <p>Оберіть готові вироби майстра або зв'яжіться для замовлення</p>
            </header>

            <FurnList
                items={items}
                loading={loading}
                mode="customer"
                onOrder={handleOrder}
            />
        </div>
    );
}