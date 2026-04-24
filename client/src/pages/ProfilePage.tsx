import { useEffect, useState, useCallback, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { profilesApi } from '@/api/profilesApi';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast'; // Наш новий хук
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import type { ProfileResponse, UpdateProfileDTO } from '@shared/types';

const ProfilePage = () => {
    const { t } = useLang();
    const { showToast } = useToast();
    const isFirstRun = useRef(true);

    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateProfileDTO>({});
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        if (isFirstRun.current) setLoading(true);

        try {
            const data = await profilesApi.getMe();
            setProfile(data);

            // Мапінг даних для форми редагування
            setFormData({
                workshop_name: ('workshop_name' in data ? data.workshop_name : '') ?? '',
                bio: data.bio ?? '',
                avatar_url: data.avatar_url ?? '',
                payment_methods: ('payment_methods' in data ? data.payment_methods : '') ?? ''
            });
        } catch (err) {
            console.error("Loading profile data error:", err)
            showToast(t('errors.fetch_profile'), 'error');
        } finally {
            setLoading(false);
            isFirstRun.current = false;
        }
    }, [t, showToast]);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            if (isMounted) await fetchProfile();
        };
        loadData();
        return () => { isMounted = false; };
    }, [fetchProfile]);

    const handleSave = async () => {
        try {
            await profilesApi.updateMe(formData);
            await fetchProfile();
            setIsEditing(false);
            showToast(t('profile.save_success'), 'success');
        } catch {
            showToast(t('errors.update_failed'), 'error');
        }
    };

    if (loading) return (
        <Box className="loading-centered">
            <CircularProgress color="primary" />
        </Box>
    );

    if (!profile) return (
        <Box className="page-container fade-in">
            <Typography align="center" color="error" sx={{ mt: 4 }}>
                {t('errors.profile_not_found')}
            </Typography>
        </Box>
    );

    return (
        <Box component="main" className="page-container fade-in">
            <Box className="section-header">
                <Typography variant="h4" className="page-title">
                    {t('profile.settings_title')}
                </Typography>
            </Box>

            <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                {isEditing ? (
                    <ProfileEditForm
                        formData={formData}
                        onChange={setFormData}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <ProfileCard
                        profile={profile}
                        isEditable={true}
                        onEdit={() => setIsEditing(true)}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;