import React from 'react';
import { FurnitureCategory, type CreateFurnitureDTO } from '@shared/types';
import styles from './Furniture.module.css';

interface Props {
    initialData: CreateFurnitureDTO;
    onSubmit: (data: CreateFurnitureDTO) => Promise<void>;
    onCancel?: () => void;
    submitText: string;
    isSubmitting: boolean;
}

export const FurnBaseForm = ({ initialData, onSubmit, onCancel, submitText, isSubmitting }: Props) => {
    const [formData, setFormData] = React.useState<CreateFurnitureDTO>(initialData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.baseForm}>
            <div className={styles.formGroup}>
                <label>Назва:</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Ціна (грн):</label>
                <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Категорія:</label>
                <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                    {Object.entries(FurnitureCategory).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Опис:</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className={styles.formActions}>
                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                    {isSubmitting ? 'Зачекайте...' : submitText}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                        Скасувати
                    </button>
                )}
            </div>
        </form>
    );
};