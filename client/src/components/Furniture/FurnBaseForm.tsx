import React, { useState } from 'react';
import { FurnitureCategory, type CreateFurnitureDTO } from '@shared/types';
import styles from './Furniture.module.css';

interface Props {
    initialData: CreateFurnitureDTO;
    onSubmit: (data: CreateFurnitureDTO) => void;
    onCancel?: () => void;
    submitText: string;
    isSubmitting: boolean;
}

export const FurnBaseForm = ({ initialData, onSubmit, onCancel, submitText, isSubmitting }: Props) => {
    const [formData, setFormData] = useState<CreateFurnitureDTO>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const updateField = <K extends keyof CreateFurnitureDTO>(key: K, value: CreateFurnitureDTO[K]) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    return (
        <form onSubmit={handleSubmit} className={styles.baseForm}>
            <div className={styles.formGroup}>
                <label>Назва:</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Ціна (грн):</label>
                <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={e => updateField('price', Number(e.target.value))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Категорія:</label>
                <select
                    value={formData.category}
                    onChange={e => updateField('category', e.target.value)}
                >
                    {Object.entries(FurnitureCategory).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Посилання на зображення (URL):</label>
                <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.image_url || ''}
                    onChange={e => updateField('image_url', e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Опис:</label>
                <textarea
                    value={formData.description || ''}
                    onChange={e => updateField('description', e.target.value)}
                />
            </div>

            <div className={styles.formActions}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Зачекайте...' : submitText}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className={styles.cancelBtn}
                    >
                        Скасувати
                    </button>
                )}
            </div>
        </form>
    );
};