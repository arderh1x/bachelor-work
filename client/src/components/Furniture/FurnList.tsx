import { FurnItem } from './FurnItem';
import type { Furniture } from '@shared/types';
import styles from './Furniture.module.css';

interface FurnListProps {
    items: Furniture[];
    loading: boolean;
    mode: 'producer' | 'customer';
    onDelete?: (id: number) => void;
    onRefresh?: () => void;
    onOrder?: (item: Furniture) => void;
}

export const FurnList = ({ items, loading, mode, onDelete, onRefresh, onOrder }: FurnListProps) => {
    if (loading) return <div className={styles.loader}>Завантаження...</div>;

    return (
        <div className={styles.itemsWrapper}>
            {items.map(item => (
                <FurnItem
                    key={item.id}
                    item={item}
                    mode={mode}
                    onDelete={onDelete}
                    onUpdate={onRefresh}
                    onOrder={onOrder}
                />
            ))}
        </div>
    );
};