import { useState } from 'react';
import styles from './OrderForm.module.css';

interface OrderContactData {
    quantity: number;
    phone: string;
    delivery_address: string;
    comment: string;
}

interface OrderFormProps {
    onSubmit: (data: OrderContactData) => void;
    onCancel: () => void;
    submitText?: string;
    showQuantity?: boolean;
}

export function OrderForm({ onSubmit, onCancel, submitText = "Підтвердити замовлення", showQuantity = true }: OrderFormProps) {
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

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {showQuantity && (
                <div className={styles.field}>
                    <label>Кількість</label>
                    <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        required
                    />
                </div>
            )}

            <div className={styles.field}>
                <label>Номер телефону</label>
                <input
                    type="tel"
                    placeholder="+380..."
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                />
            </div>

            <div className={styles.field}>
                <label>Адреса доставки</label>
                <input
                    type="text"
                    placeholder="Місто, відділення або вулиця..."
                    value={formData.delivery_address}
                    onChange={e => setFormData({ ...formData, delivery_address: e.target.value })}
                    required
                />
            </div>

            <div className={styles.field}>
                <label>Коментар (необов'язково)</label>
                <textarea
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Наприклад: колір оббивки, зручний час дзвінка..."
                />
            </div>

            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>{submitText}</button>
                <button type="button" onClick={onCancel} className={styles.cancelBtn}>Скасувати</button>
            </div>
        </form>
    );
}