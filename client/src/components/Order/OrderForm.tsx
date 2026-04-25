import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import type { CreateOrderDTO } from '@shared/types';
import { useLang } from '@/hooks/useLang';

export type OrderContactData = Pick<CreateOrderDTO, 'quantity' | 'phone' | 'delivery_address' | 'comment'>;

interface OrderFormProps {
    onSubmit: (data: OrderContactData) => void;
    onCancel: () => void;
    submitText: string;
    showQuantity?: boolean;
    isSubmitting: boolean;
}

function OrderForm({ onSubmit, onCancel, submitText, showQuantity = true, isSubmitting }: OrderFormProps) {
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
        <Box component="form" onSubmit={handleSubmit} className="form-stack form-container-padding">

            {showQuantity && (
                <TextField type="number" onChange={e => updateField('quantity', Math.max(1, Number(e.target.value)))}
                    value={formData.quantity} label={t('orders.quantity')} fullWidth required />
            )}

            <TextField type="tel" onChange={e => updateField('phone', e.target.value)} value={formData.phone}
                label={t('orders.phone')} placeholder={t('orders.phone_placeholder')} fullWidth required />

            <TextField onChange={e => updateField('delivery_address', e.target.value)} value={formData.delivery_address}
                label={t('orders.delivery_address')} placeholder={t('orders.address_placeholder')} fullWidth required />

            <TextField onChange={e => updateField('comment', e.target.value)} value={formData.comment || ''}
                label={t('orders.comment')} multiline rows={2} fullWidth />

            <Box className="actions-group">
                <Button onClick={onCancel} disabled={isSubmitting} variant="outlined"
                    color="inherit" className="btn-base">
                    {t('common.cancel')}
                </Button>

                <Button type="submit" disabled={isSubmitting} variant="contained"
                    color="primary" className="btn-base">
                    {isSubmitting ? t('common.loading') : submitText}
                </Button>

            </Box>
        </Box>
    );
};

export default OrderForm;