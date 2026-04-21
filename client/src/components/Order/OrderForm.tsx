import React, { useState } from 'react';
import type { CreateOrderDTO } from '@shared/types';
import styles from './OrderForm.module.css';

export type OrderContactData = Pick<CreateOrderDTO, 'quantity' | 'phone' | 'delivery_address' | 'comment'>;

interface OrderFormProps {
    onSubmit: (data: OrderContactData) => void;
    onCancel: () => void;
    submitText?: string;
    showQuantity?: boolean;
}

export const OrderForm = ({ onSubmit, onCancel, submitText = "Підтвердити замовлення", showQuantity = true }: OrderFormProps) => {
    const [formData, setFormData] = useState<OrderContactData>({
        quantity: 1,
        phone: '',
        delivery_address: '',
        comment: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const updateField = <K extends keyof OrderContactData>(key: K, value: OrderContactData[K]) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    return (
        <form className={styles.orderForm} onSubmit={handleSubmit}>
            {showQuantity && (
                <div className={styles.formGroup}>
                    <label>Кількість:</label>
                    <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={e => updateField('quantity', Math.max(1, Number(e.target.value)))}
                        required
                    />
                </div>
            )}

            <div className={styles.formGroup}>
                <label>Телефон:</label>
                <input
                    type="tel"
                    placeholder="+380..."
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Адреса доставки:</label>
                <input
                    type="text"
                    placeholder="Місто, відділення або вулиця"
                    value={formData.delivery_address}
                    onChange={e => updateField('delivery_address', e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Коментар:</label>
                <textarea
                    value={formData.comment || ''}
                    onChange={e => updateField('comment', e.target.value)}
                />
            </div>

            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>{submitText}</button>
                <button type="button" onClick={onCancel} className={styles.cancelBtn}>Скасувати</button>
            </div>
        </form>
    );
};