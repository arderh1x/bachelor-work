import { Box, TextField, Button, Avatar, Paper, Typography } from '@mui/material';
import { Save, X, User as UserIcon } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import type { UpdateProfileDTO } from '@shared/types';
import type { ChangeEvent } from 'react';

interface ProfileEditFormProps {
    formData: UpdateProfileDTO;
    onChange: (data: UpdateProfileDTO) => void;
    onSave: () => void;
    onCancel: () => void;
}

function ProfileEditForm({ formData, onChange, onSave, onCancel }: ProfileEditFormProps) {
    const { t } = useLang();
    const { user } = useAuth();

    const handleChange = (field: keyof UpdateProfileDTO) =>
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onChange({ ...formData, [field]: e.target.value });
        };

    return (
        <Paper className="app-card dialog-body-padding fade-in">
            <Typography variant="h5" className="form-section-title">
                {t('profile.edit_title')}
            </Typography>

            <Box className="form-container-padding">
                <Box className="flex-between" sx={{ gap: 3, marginBottom: 4 }}>
                    <Avatar src={formData.avatar_url || ''} className="profile-avatar-large">
                        {!formData.avatar_url && <UserIcon size={32} />}
                    </Avatar>

                    <TextField onChange={handleChange('avatar_url')} variant="outlined" placeholder="https://..."
                        value={formData.avatar_url || ''} label={t('profile.avatar_url')} fullWidth />
                </Box>
                <Box className="form-stack">
                    {user?.is_producer_mode && (
                        <>
                            <TextField onChange={handleChange('workshop_name')} value={formData.workshop_name || ''}
                                fullWidth label={t('profile.workshop_name')} />

                            <TextField onChange={handleChange('payment_methods')} value={formData.payment_methods || ''}
                                fullWidth label={t('profile.payment_methods')} placeholder={t('profile.payment_placeholder')}
                                multiline rows={2} />
                        </>
                    )}

                    <TextField onChange={handleChange('bio')} value={formData.bio || ''}
                        fullWidth label={t('profile.bio')} multiline rows={4} />
                </Box>
            </Box>

            <Box className="actions-group">
                <Button onClick={onCancel} variant="outlined" startIcon={<X size={18} />} className="btn-base">
                    {t('common.cancel')}
                </Button>

                <Button onClick={onSave} variant="contained" className="btn-base" startIcon={<Save size={18} />}>
                    {t('common.save')}
                </Button>
            </Box>
        </Paper>
    );
};

export default ProfileEditForm;