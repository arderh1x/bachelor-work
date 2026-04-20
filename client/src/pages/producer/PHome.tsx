import { Routes, Route, Navigate } from 'react-router-dom';
import layout from '@/styles/Layout.module.css';
import { FurnInventory } from './FurnInventory';

const OrdersPage = () => (
    <div className={layout.pageContainer}>
        <header className={layout.header}>
            <h1 className={layout.title}>Вхідні замовлення</h1>
            <p className={layout.subtitle}>Керуйте запитами від ваших клієнтів</p>
        </header>
        {/* Сюди потім додамо компонент списку замовлень */}
        <p>Список замовлень порожній...</p>
    </div>
);

const ProfileEditPage = () => (
    <div className={layout.pageContainer}>
        <header className={layout.header}>
            <h1 className={layout.title}>Налаштування майстерні</h1>
            <p className={layout.subtitle}>Редагуйте інформацію, яку бачать клієнти</p>
        </header>
        {/* Сюди піде форма редагування профілю */}
        <p>Налаштування профілю в розробці...</p>
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
                <Route path="/profile/edit" element={<ProfileEditPage />} />

                <Route path="*" element={<Navigate to="/inventory" replace />} />
            </Routes>
        </div>
    );
};

export default PHome;