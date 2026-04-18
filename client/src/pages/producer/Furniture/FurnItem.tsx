import { useState } from 'react';
import type { Furniture } from '@shared/types';
import { FurnEditForm } from './FurnEditForm';
import styles from './Furniture.module.css';

interface FurnItemProps {
    item: Furniture;
    onDelete: (id: number) => void;
    onUpdate: () => void;
}

export const FurnItem = ({ item, onDelete, onUpdate }: FurnItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <div className={styles.itemCard}>
                <FurnEditForm
                    item={item}
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => {
                        setIsEditing(false);
                        onUpdate();
                    }}
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
                <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                    Редагувати
                </button>
                <button onClick={() => onDelete(item.id)} className={styles.delBtn}>
                    Видалити
                </button>
            </div>
        </div>
    );
};