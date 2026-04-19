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
                        {isProducer ? `Workshop name: ${profile.workshop_name}` : ''}
                    </h1>
                </div>
            </div>
            
            <div className={styles.infoSection}>
                <div className={styles.field}>
                    <label>{isProducer ? 'About Workshop:' : 'About Me:'}</label>
                    <p>{profile.bio || 'No description provided'}</p>
                </div>
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
};