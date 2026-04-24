import { useLang } from '@/hooks/useLang';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { FurnitureCategory, type CreateFurnitureDTO } from '@shared/types';
import { useState, useCallback } from 'react';

interface Props {
    initialData: CreateFurnitureDTO;
    onSubmit: (data: CreateFurnitureDTO) => void;
    onCancel?: () => void;
    submitText: string;
    isSubmitting: boolean;
}

export const FurnitureBaseForm = ({ initialData, onSubmit, onCancel, submitText, isSubmitting }: Props) => {
    const { t } = useLang();
    const [formData, setFormData] = useState<CreateFurnitureDTO>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const updateField = useCallback(<K extends keyof CreateFurnitureDTO>(
        field: K,
        value: CreateFurnitureDTO[K]
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return (
        <Box component="form" onSubmit={handleSubmit} className="form-stack fade-in" >
            <TextField onChange={e => updateField('name', e.target.value)} value={formData.name}
                fullWidth label={t('inventory.item_name')} required disabled={isSubmitting} />

            <Box className="form-row">
                <TextField type="number" onChange={e => updateField('price', Number(e.target.value))}
                    value={formData.price} fullWidth label={t('inventory.price')} required disabled={isSubmitting} />

                <TextField onChange={e => updateField('category', e.target.value as FurnitureCategory)}
                    value={formData.category} fullWidth label={t('common.category')} select disabled={isSubmitting}>

                    {Object.entries(FurnitureCategory).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {t(`categories.${value}`)}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <TextField onChange={e => updateField('image_url', e.target.value)} value={formData.image_url || ''}
                fullWidth label={t('inventory.image_url') || t('profile.avatar_url')} disabled={isSubmitting}
                placeholder="https://placehold.co/400x400" />

            <TextField onChange={e => updateField('description', e.target.value)} value={formData.description || ''}
                fullWidth label={t('inventory.description') || t('profile.bio')} multiline rows={4} disabled={isSubmitting} />


            <Box className="actions-group">
                {onCancel && (
                    <Button onClick={onCancel} variant="outlined" disabled={isSubmitting} className="btn-base" >
                        {t('common.cancel')}
                    </Button>
                )}
                <Button type="submit" variant="contained" disabled={isSubmitting} className="btn-base">
                    {isSubmitting ? t('common.loading') : submitText}
                </Button>
            </Box>
        </Box>
    );
};