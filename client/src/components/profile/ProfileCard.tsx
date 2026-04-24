import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { Edit3, CreditCard, Info, User as UserIcon } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import type { Producer, Customer } from '@shared/types';

interface ProfileCardProps {
    profile: Producer | Customer;
    // Додаємо опціональний проп для імені користувача (username)
    username?: string;
    isEditable?: boolean;
    onEdit?: () => void;
    variant?: 'full' | 'header';
    className?: string;
}

export function ProfileCard({
    profile,
    username,
    isEditable = false,
    onEdit,
    variant = 'full',
    className = ''
}: ProfileCardProps) {
    const { t } = useLang();

    // Перевірка на виробника за наявністю специфічного поля
    const isProducer = 'workshop_name' in profile;
    const isHeader = variant === 'header';

    // Визначаємо, що показувати як ім'я
    const displayName = isProducer
        ? (profile as Producer).workshop_name
        : (username || t('profile.customer_title'));

    const containerClass = isHeader
        ? `fade-in ${className}`
        : `app-card profile-card-container fade-in ${className}`;

    return (
        <Box className={containerClass}>
            <Box className={isHeader ? 'profile-header-left' : 'profile-header-center'}>
                <Avatar src={profile.avatar_url || ''} className="profile-avatar-large">
                    {!profile.avatar_url && <UserIcon size={40} />}
                </Avatar>
                <Box>
                    <Typography variant={isHeader ? "h3" : "h4"} className="card-title">
                        {displayName}
                    </Typography>
                    {isProducer && (
                        <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
                            {isHeader ? t('profile.verified_producer') : t('profile.producer_mode')}
                        </Typography>
                    )}
                </Box>
            </Box>

            {!isHeader && <Divider className="divider-std" />}

            <Box className="form-stack">
                <Box className="profile-info-item">
                    <Typography variant="subtitle2" color="textSecondary" className="profile-label-with-icon">
                        <Info size={16} /> {isProducer ? t('profile.about_workshop') : t('profile.about_me')}
                    </Typography>
                    <Typography variant="body1">
                        {profile.bio || t('profile.no_bio')}
                    </Typography>
                </Box>

                {/* Рендеримо методи оплати тільки для виробника і тільки у повній версії */}
                {isProducer && !isHeader && (
                    <Box className="profile-info-item">
                        <Typography variant="subtitle2" color="textSecondary" className="profile-label-with-icon">
                            <CreditCard size={16} /> {t('profile.payment_methods')}
                        </Typography>
                        <Typography variant="body1">
                            {(profile as Producer).payment_methods || t('profile.no_methods')}
                        </Typography>
                    </Box>
                )}
            </Box>

            {isEditable && onEdit && (
                <Box className="actions-group">
                    <Button
                        onClick={onEdit}
                        variant="contained"
                        startIcon={<Edit3 size={18} />}
                        className="btn-base"
                    >
                        {t('profile.edit_button')}
                    </Button>
                </Box>
            )}
        </Box>
    );
}