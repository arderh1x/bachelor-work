import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { profilesApi } from '@/api/profiles';
import { useAuth } from '@/hooks/useAuth';
import type { Producer } from '@shared/types';

import layout from '@/styles/Layout.module.css';
import styles from './Producers.module.css';

export const ProducersList = () => {
    const { user } = useAuth();
    const [producers, setProducers] = useState<Producer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        profilesApi.getAllProducers()
            .then(data => setProducers(data))
            .catch(err => {
                console.error(err);
                setError('Не вдалося завантажити список майстрів');
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredProducers = useMemo(() => {
        if (!user) return producers;
        return producers.filter(p => p.user_id !== user.id);
    }, [producers, user]);

    if (loading) return <div className={layout.pageContainer}>Завантаження майстрів...</div>;

    return (
        <div className={layout.pageContainer}>
            <header className={layout.header}>
                <h1 className={layout.title}>Наші майстри</h1>
                <p className={layout.subtitle}>Оберіть професіонала для вашого проєкту</p>
            </header>

            {error && <div className={styles.errorBadge}>{error}</div>}

            <div className={styles.producersGrid}>
                {filteredProducers.length > 0 ? (
                    filteredProducers.map(p => (
                        <article key={p.user_id} className={styles.producerCard}>
                            <div className={styles.imageWrapper}>
                                {p.avatar_url ? (
                                    <img src={p.avatar_url} alt={p.workshop_name || ''} className={styles.image} />
                                ) : (
                                    <div className={styles.placeholderIcon}>🪵</div>
                                )}
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.workshopName}>{p.workshop_name || 'Приватна майстерня'}</h3>
                                <p className={styles.bio}>
                                    {p.bio ? `${p.bio.substring(0, 85)}...` : 'Опис відсутній.'}
                                </p>
                                <Link to={`/producer/${p.user_id}`} className={styles.viewBtn}>
                                    Відвідати майстерню
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>Наразі немає інших зареєстрованих майстрів.</p>
                    </div>
                )}
            </div>
        </div>
    );
};