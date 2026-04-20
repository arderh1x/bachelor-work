import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profilesApi } from '@/api/profiles';
import type { Producer } from '@shared/types';

import layout from '@/styles/Layout.module.css';
import styles from './Producers.module.css';

const CHome = () => {
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

    if (loading) return <div className={layout.pageContainer}>Завантаження...</div>;

    return (
        <div className={layout.pageContainer}>
            <header className={layout.header}>
                <h1 className={layout.title}>Наші майстри</h1>
                <p className={layout.subtitle}>Оберіть професіонала для вашого проєкту</p>
            </header>

            {error && <div className={styles.errorBadge}>{error}</div>}

            <div className={styles.producersGrid}>
                {producers.length > 0 ? (
                    producers.map(p => (
                        <article key={p.user_id} className={styles.producerCard}>
                            <div className={styles.imageWrapper}>
                                {p.avatar_url ? (
                                    <img src={p.avatar_url} alt={p.workshop_name || ''} className={styles.image} />
                                ) : (
                                    <div className={styles.placeholderIcon}>🪵</div>
                                )}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.workshopName}>
                                    {p.workshop_name || 'Приватна майстерня'}
                                </h3>
                                <p className={styles.bio}>
                                    {p.bio ? `${p.bio.substring(0, 85)}...` : 'Майстер ще не додав опис своєї діяльності.'}
                                </p>
                                <Link to={`/producer/${p.user_id}`} className={styles.viewBtn}>
                                    Відвідати майстерню
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>Наразі немає зареєстрованих майстрів.</p>
                )}
            </div>
        </div>
    );
};

export default CHome;