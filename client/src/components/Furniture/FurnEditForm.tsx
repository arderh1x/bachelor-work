import { useState } from 'react';
import { FurnBaseForm } from './FurnBaseForm';
import { furnitureApi } from '@/api/furniture';
import type { Furniture } from '@shared/types';
import styles from './Furniture.module.css'; // Імпортуємо стилі

interface EditProps {
    item: Furniture;
    onSuccess: () => void;
    onCancel: () => void;
}

export const FurnEditForm = ({ item, onSuccess, onCancel }: EditProps) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (data: Partial<Furniture>) => {
        setLoading(true);
        try {
            await furnitureApi.update(item.id, data);
            onSuccess();
        } catch (error: unknown) {
            console.error(error);
            alert('Помилка при оновленні');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.editFormContainer}>
            <FurnBaseForm
                initialData={item}
                onSubmit={handleUpdate}
                onCancel={onCancel}
                submitText={loading ? "Збереження..." : "Зберегти"}
                isSubmitting={loading}
            />
        </div>
    );
};