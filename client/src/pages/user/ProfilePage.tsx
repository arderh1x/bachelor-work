import { useEffect, useState } from 'react';
import type { ProfileResponse, UpdateProfileDTO } from '@shared/types';
import styles from './Profile.module.css';
import { useAuth } from '@/hooks/useAuth';
import { profilesApi } from '@/api/profiles';
import { ProfileCard } from './ProfileCard';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateProfileDTO>({});
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const data = await profilesApi.getMe();
            setProfile(data);
            setFormData({
                workshop_name: ('workshop_name' in data ? data.workshop_name : '') ?? '',
                bio: data.bio ?? '',
                avatar_url: data.avatar_url ?? '',
                payment_methods: ('payment_methods' in data ? data.payment_methods : '') ?? ''
            });
        } catch (err) {
            console.error("Error loading profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        setIsEditing(false);
    }, [user?.is_producer_mode]);

    const handleSave = async () => {
        try {
            await profilesApi.updateMe(formData);
            await fetchProfile();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (!profile) return <div className={styles.container}>Profile not found</div>;

    return (
        <div className={styles.container}>
            <h1>My Profile Settings</h1>

            {isEditing ? (
                <div className={styles.profileCard}>
                    <div className={styles.avatarSection}>
                        <img src={formData.avatar_url || 'https://placehold.co/600x400'} className={styles.avatar} alt="Preview" />
                        <input
                            type="text"
                            placeholder="Avatar URL"
                            value={formData.avatar_url}
                            onChange={e => setFormData({ ...formData, avatar_url: e.target.value })}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        {user?.is_producer_mode && (
                            <>
                                <div className={styles.field}>
                                    <label>Workshop Name</label>
                                    <input
                                        value={formData.workshop_name}
                                        onChange={e => setFormData({ ...formData, workshop_name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label>Payment Methods</label>
                                    <input
                                        placeholder="e.g. Card, Cash, PayPal"
                                        value={formData.payment_methods}
                                        onChange={e => setFormData({ ...formData, payment_methods: e.target.value })}
                                    />
                                </div>
                            </>
                        )}
                        <div className={styles.field}>
                            <label>Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button onClick={handleSave} className={styles.saveBtn}>Save</button>
                        <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
                    </div>
                </div>
            ) : (
                <ProfileCard
                    profile={profile}
                    isEditable={true}
                    onEdit={() => setIsEditing(true)}
                />
            )}
        </div>
    );
};

export default ProfilePage;