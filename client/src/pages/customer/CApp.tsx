import { Routes, Route, Navigate } from 'react-router-dom';
import CHome from './CHome';
import CProducerDetails from './CProducerDetails';
import { OrderCustomPage } from './OrderCustomPage';
import { OrderItemPage } from './OrderItemPage';

const CApp = () => {
    return (
        <div className="customer-layout">
            <Routes>
                <Route path="/" element={<CHome />} />
                <Route path="/producer/:id" element={<CProducerDetails />} />
                <Route path="/my-orders" element={<div>Мої запити на меблі</div>} />
                <Route path="/order/custom/:producerId" element={<OrderCustomPage />} />
                <Route path="/order/item/:itemId" element={<OrderItemPage />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default CApp;