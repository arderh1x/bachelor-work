import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { furnitureApi } from '@/api/furniture';
import { profilesApi } from '@/api/profiles';
import { FurnList } from '@/components/Furniture/FurnList';
import { ProfileCard } from '../user/ProfileCard';
import type { Furniture, Producer } from '@shared/types';

import layout from './Layout.module.css';
import styles from '@/components/Furniture/Furniture.module.css';

export default function CProducerDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
            .catch(err => console.error("Помилка завантаження даних майстерні:", err))
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, [id]);

    return (
        <div className={layout.pageContainer}>
            {producer && (
                <section className={layout.section}>
                    <ProfileCard profile={producer} isEditable={false} />

                    <div style={{ marginTop: '20px' }}>
                        <button
                            className={styles.orderBtn}
                            style={{ borderRadius: '8px', width: 'auto', padding: '12px 24px' }}
                            // Перехід на сторінку кастомного замовлення (двокрокова форма)
                            onClick={() => navigate(`/order/custom/${producer.user_id}`)}
                        >
                            ✨ Замовити щось унікальне
                        </button>
                    </div>
                </section>
            )}

            <header className={layout.header}>
                <h2 className={layout.title}>Каталог майстерні</h2>
                <p className={layout.subtitle}>Оберіть готові вироби або зробіть індивідуальний запит</p>
            </header>

            <FurnList
                items={items}
                loading={loading}
                mode="customer"
                // Перехід на сторінку замовлення конкретного товару
                onOrder={(item) => navigate(`/order/item/${item.id}`)}
            />
        </div>
    );
}