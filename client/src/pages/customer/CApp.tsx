import { Routes, Route, Navigate } from 'react-router-dom';
import CHome from './CHome';

const CApp = () => {
    return (
        <div className="customer-layout">
            <Routes>
                <Route path="/" element={<CHome />} />
                <Route path="/producer/:id" element={<div>Профіль майстра та його товари</div>} />
                <Route path="/my-orders" element={<div>Мої запити на меблі</div>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default CApp;