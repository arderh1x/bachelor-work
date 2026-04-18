import { FurnItem } from './FurnItem';
import type { Furniture } from '@shared/types';
import styles from './Furniture.module.css';

interface FurnListProps {
    items: Furniture[];
    loading: boolean;
    onDelete: (id: number) => void;
    onRefresh: () => void;
}

export const FurnList = ({ items, loading, onDelete, onRefresh }: FurnListProps) => {
    if (loading) {
        return <div className={styles.loader}>Синхронізація з базою даних...</div>;
    }

    if (items.length === 0) {
        return (
            <div className={styles.emptyMsg}>
                Ваш склад порожній. Додайте перший товар, щоб він з'явився в каталозі.
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            <h2>Ваш асортимент</h2>
            <div className={styles.itemsWrapper}>
                {items.map((item) => (
                    <FurnItem
                        key={item.id}
                        item={item}
                        onDelete={onDelete}
                        onUpdate={onRefresh}
                    />
                ))}
            </div>
        </div>
    );
};