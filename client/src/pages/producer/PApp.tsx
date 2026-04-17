// pages/producer/PApp.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import PHome from './PHome';
import Inventory from './Inventory'; // Треба буде створити цей файл

const PApp = () => {
    return (
        <div className="producer-layout">
            <Routes>
                <Route path="/" element={<PHome />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<div>Тут буде список вхідних замовлень</div>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default PApp;