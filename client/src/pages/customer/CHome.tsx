import type { Producer } from '@shared/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Producers.module.css';

const CHome = () => {
    const [producers, setProducers] = useState<Producer[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/profiles/producers')
            .then(res => res.json())
            .then(data => setProducers(data))
            .catch(err => setError(`Помилка: ${err}`));
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 20px' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1>Наші майстри</h1>
                <p>Оберіть професіонала для вашого проєкту</p>
            </header>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px'
            }}>
                {producers.map(p => (
                    <div key={p.user_id} className={styles.producerCard}>
                        <div className={styles.imageWrapper}>
                            {p.avatar_url ? (
                                <img src={p.avatar_url} alt={p.workshop_name} className={styles.image} />
                            ) : (
                                <span className={styles.noImage}>Фото відсутнє</span>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{p.workshop_name || 'Майстер'}</h3>
                            <p className={styles.bio}>
                                {p.bio ? `${p.bio.substring(0, 100)}...` : 'Опис відсутній.'}
                            </p>
                            <Link to={`/producer/${p.user_id}`} className={styles.viewBtn}>
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