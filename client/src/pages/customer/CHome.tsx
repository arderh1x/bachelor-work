import type { Producer } from '@shared/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '@/components/Furniture/Furniture.module.css';

const CHome = () => {
    const [producers, setProducers] = useState<Producer[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/profiles/producers')
            .then(res => res.json())
            .then(data => setProducers(data))
            .catch(err => setError(`Не вдалося завантажити майстрів: ${err}`));
    }, []);

    return (
        <div className={styles.inventoryContainer}>
            <header style={{ marginBottom: '30px' }}>
                <h1>Наші майстри</h1>
                <p>Оберіть професіонала для вашого проєкту</p>
            </header>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.producersGrid}>
                {producers.map(p => (
                    <div key={p.user_id} className={`${styles.itemCard} ${styles.producerCard}`}>
                        <div className={styles.producerImageWrapper}>
                            {p.avatar_url ? (
                                <img src={p.avatar_url} alt={p.workshop_name} className={styles.producerImage} />
                            ) : (
                                <span className={styles.noImagePlaceholder}>Фото відсутнє</span>
                            )}
                        </div>
                        <div className={styles.producerContent}>
                            <h3 className={styles.producerTitle}>{p.workshop_name || 'Майстер'}</h3>
                            <p className={styles.description}>
                                {p.bio ? `${p.bio.substring(0, 100)}...` : 'Опис відсутній.'}
                            </p>
                            <Link
                                to={`/producer/${p.user_id}`}
                                className={styles.orderBtn}
                                style={{ textDecoration: 'none', textAlign: 'center', marginTop: 'auto' }}
                            >
                                Переглянути майстерню →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CHome;