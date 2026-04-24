import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import type { CreateOrderDTO } from '@shared/types';
import { useLang } from '@/hooks/useLang';

export type OrderContactData = Pick<CreateOrderDTO, 'quantity' | 'phone' | 'delivery_address' | 'comment'>;

interface Props {
    onSubmit: (data: OrderContactData) => void;
    onCancel: () => void;
    submitText: string;
    showQuantity?: boolean;
    isSubmitting: boolean;
}

export const OrderForm = ({ onSubmit, onCancel, submitText, showQuantity = true, isSubmitting }: Props) => {
    const { t } = useLang();
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
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-stack form-container-padding"
        >
            {showQuantity && (
                <TextField
                    type="number"
                    onChange={e => updateField('quantity', Math.max(1, Number(e.target.value)))}
                    value={formData.quantity}
                    fullWidth
                    label={t('orders.quantity')}
                    required
                />
            )}

            <TextField
                type="tel"
                onChange={e => updateField('phone', e.target.value)}
                value={formData.phone}
                fullWidth
                label={t('orders.phone')}
                placeholder="+380..."
                required
            />

            <TextField
                fullWidth
                label={t('orders.delivery_address')}
                placeholder={t('orders.address_placeholder')}
                value={formData.delivery_address}
                onChange={e => updateField('delivery_address', e.target.value)}
                required
            />

            <TextField
                fullWidth
                multiline
                rows={2}
                label={t('orders.comment')}
                value={formData.comment || ''}
                onChange={e => updateField('comment', e.target.value)}
            />

            <Box className="actions-group">
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    className="btn-base"
                    disabled={isSubmitting}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-base"
                >
                    {isSubmitting ? t('common.loading') : submitText}
                </Button>
            </Box>
        </Box>
    );
};