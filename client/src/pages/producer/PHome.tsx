import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PHome = () => {
    const { user } = useAuth();

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1>Вітаємо, {user?.username}! 👋</h1>
                <p>Ваша майстерня сьогодні працює в штатному режимі.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                {/* Картка замовлень */}
                <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>📥 Нові замовлення</h3>
                    <p>У вас 0 активних запитів на меблі.</p>
                    <Link to="/orders" style={{ display: 'inline-block', marginTop: '10px', padding: '8px 16px', backgroundColor: '#000', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
                        Переглянути замовлення
                    </Link>
                </div>

                {/* Картка складу */}
                <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>📦 Ваш склад</h3>
                    <p>Зараз на вітрині 0 товарів.</p>
                    <Link to="/inventory" style={{ display: 'inline-block', marginTop: '10px', padding: '8px 16px', border: '1px solid #000', color: '#000', borderRadius: '5px', textDecoration: 'none' }}>
                        Додати товар
                    </Link>
                </div>
            </div>

            <section style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h4>💡 Порада для бізнесу</h4>
                <p style={{ fontSize: '0.9em', color: '#555' }}>
                    Додайте реальні фото ваших робіт у склад, щоб замовники могли оцінити ваш стиль та якість виконання.
                </p>
            </section>
        </div>
    );
};

export default PHome;