import type { Producer } from '@shared/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CHome = () => {
    const [producers, setProducers] = useState<Producer[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('api/profiles/producers')
            .then(res => res.json())
            .then(data => setProducers(data))
            .catch(err => setError(`Не вдалося завантажити список майстрів: ${err}`));
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1>Наші майстри</h1>
                <p>Знайдіть професіонала для вашого проєкту</p>
            </header>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {producers.map(p => (
                    <div key={p.user_id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '10px' }}>
                            {p.avatar_url && <img src={p.avatar_url} alt={p.workshop_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <h3>{p.workshop_name || 'Без назви'}</h3>
                        <p style={{ fontSize: '0.9em', color: '#666' }}>{p.bio?.substring(0, 100)}...</p>
                        <Link to={`/producer/${p.user_id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                            Переглянути майстерню →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CHome;