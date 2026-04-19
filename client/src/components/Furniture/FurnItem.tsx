import { useState } from 'react';
import type { Furniture } from '@shared/types';
import { FurnEditForm } from './FurnEditForm';
import styles from './Furniture.module.css';

interface FurnItemProps {
    item: Furniture;
    mode: 'producer' | 'customer';
    onDelete?: (id: number) => void;
    onUpdate?: () => void;
    onOrder?: (item: Furniture) => void;
}

export const FurnItem = ({ item, mode, onDelete, onUpdate, onOrder }: FurnItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    if (mode === 'producer' && isEditing) {
        return (
            <div className={styles.itemCard}>
                <FurnEditForm
                    item={item}
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => { setIsEditing(false); onUpdate?.(); }}
                />
            </div>
        );
    }

    return (
        <div className={styles.itemCard}>
            <div className={styles.info}>
                <div className={styles.itemTitle}>
                    <strong>{item.name}</strong>
                    <span className={styles.categoryBadge}>{item.category}</span>
                </div>
                <div className={styles.itemPrice}>{item.price} грн</div>
                {item.description && <p className={styles.description}>{item.description}</p>}
            </div>

            <div className={styles.actions}>
                {mode === 'producer' ? (
                    <>
                        <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                            Редагувати
                        </button>
                        <button onClick={() => onDelete?.(item.id)} className={styles.delBtn}>
                            Видалити
                        </button>
                    </>
                ) : (
                    <button onClick={() => onOrder?.(item)} className={styles.orderBtn}>
                        Замовити
                    </button>
                )}
            </div>
        </div>
    );
};