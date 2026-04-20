import type { Producer, Customer } from '@shared/types';
import styles from '@/pages/user/Profile.module.css';

interface ProfileCardProps {
    profile: Producer | Customer;
    isEditable?: boolean;
    onEdit?: () => void;
}

export function ProfileCard({ profile, isEditable = false, onEdit }: ProfileCardProps) {
    const isProducer = 'workshop_name' in profile;

    return (
        <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
                <img
                    src={profile.avatar_url || 'https://placehold.co/600x400'}
                    alt="Avatar"
                    className={styles.avatar}
                />
                <div className={styles.infoSection} style={{ textAlign: 'center', border: 'none' }}>
                    <h1 style={{ margin: '10px 0' }}>
                        {isProducer ? profile.workshop_name : 'Customer Profile'}
                    </h1>
                </div>
            </div>

            <div className={styles.infoSection}>
                <div className={styles.field}>
                    <label>{isProducer ? 'About Workshop:' : 'About Me:'}</label>
                    <p>{profile.bio || 'No description provided'}</p>
                </div>

                {isProducer && (
                    <div className={styles.field}>
                        <label>Accepted Payment Methods:</label>
                        <p>{(profile as Producer).payment_methods || 'Not specified'}</p>
                    </div>
                )}
            </div>

            {isEditable && onEdit && (
                <div className={styles.actions}>
                    <button onClick={onEdit} className={styles.editBtn}>
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}