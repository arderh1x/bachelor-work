import { Routes, Route, Navigate } from 'react-router-dom';
import layout from '@/styles/Layout.module.css';
import { FurnInventory } from './FurnInventory';
import ProfilePage from '@/pages/user/ProfilePage';
import { OrderList } from '@/components/Order/OrdersList';

const OrdersPage = () => (
    <div className={layout.pageContainer}>
        <header className={layout.header}>
            <h1 className={layout.title}>Вхідні замовлення</h1>
            <p className={layout.subtitle}>Керуйте запитами від ваших клієнтів</p>
        </header>
        <OrderList mode="producer" />
    </div>
);

const PHome = () => {
    return (
        <div className="producer-layout">
            <Routes>
                <Route path="/" element={<Navigate to="/inventory" replace />} />

                <Route path="/inventory" element={
                    <div className={layout.pageContainer}>
                        <header className={layout.header}>
                            <h1 className={layout.title}>Керування складом</h1>
                            <p className={layout.subtitle}>Додавайте нові меблі та оновлюйте поточний асортимент</p>
                        </header>
                        <FurnInventory />
                    </div>
                } />

                <Route path="/orders" element={<OrdersPage />} />

                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<Navigate to="/inventory" replace />} />
            </Routes>
        </div>
    );
};

export default PHome;