import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const PHome = () => {
    const { user } = useAuth();

    return (
        <div className="producer-home">
            <h1>Вітаємо, {user?.username}!</h1>
            <p>Це ваша панель керування виробництвом.</p>

            <div className="dashboard-grid">
                <Link to="/inventory" className="dashboard-card">
                    <h3>Мій Склад</h3>
                    <p>Керування асортиментом меблів</p>
                </Link>
                <Link to="/orders" className="dashboard-card">
                    <h3>Замовлення</h3>
                    <p>Перегляд та оновлення статусів</p>
                </Link>
            </div>
        </div>
    );
};

export default PHome;