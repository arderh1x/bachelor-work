import { Box, TextField, Button, Avatar, Paper, Typography } from '@mui/material';
import { Save, X, User as UserIcon } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import type { UpdateProfileDTO } from '@shared/types';

interface ProfileEditFormProps {
    formData: UpdateProfileDTO;
    onChange: (data: UpdateProfileDTO) => void;
    onSave: () => void;
    onCancel: () => void;
}

export const ProfileEditForm = ({ formData, onChange, onSave, onCancel }: ProfileEditFormProps) => {
    const { t } = useLang();
    const { user } = useAuth();

    const handleChange = (field: keyof UpdateProfileDTO) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange({ ...formData, [field]: e.target.value });
    };

    return (
        <Paper className="app-card dialog-body-padding fade-in">
            <Typography variant="h5" className="form-section-title">
                {t('profile.edit_title')}
            </Typography>

            {/* Блок зміни аватара */}
            <Box className="avatar-edit-group">
                <Avatar src={formData.avatar_url || ''} className="profile-avatar-large">
                    {!formData.avatar_url && <UserIcon size={32} />}
                </Avatar>
                <TextField
                    onChange={handleChange('avatar_url')}
                    value={formData.avatar_url || ''}
                    variant="outlined"
                    fullWidth
                    label={t('profile.avatar_url')}
                    className="avatar-url-input"
                />
            </Box>

            {/* Основні поля форми */}
            <Box className="form-stack">
                {user?.is_producer_mode && (
                    <>
                        <TextField
                            onChange={handleChange('workshop_name')}
                            value={formData.workshop_name || ''}
                            fullWidth
                            label={t('profile.workshop_name')}
                        />

                        <TextField
                            onChange={handleChange('payment_methods')}
                            value={formData.payment_methods || ''}
                            fullWidth
                            label={t('profile.payment_methods')}
                            placeholder={t('profile.payment_placeholder')}
                        />
                    </>
                )}

                <TextField
                    onChange={handleChange('bio')}
                    value={formData.bio || ''}
                    fullWidth
                    label={t('profile.bio')}
                    multiline
                    rows={4}
                />
            </Box>

            {/* Кнопки дій */}
            <Box className="actions-group">
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    startIcon={<X size={18} />}
                    className="btn-base"
                >
                    {t('common.cancel')}
                </Button>

                <Button
                    onClick={onSave}
                    variant="contained"
                    className="btn-base"
                    startIcon={<Save size={18} />}
                >
                    {t('common.save')}
                </Button>
            </Box>
        </Paper>
    );
};