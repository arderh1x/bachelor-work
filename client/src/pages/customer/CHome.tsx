import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderCustomPage } from './OrderCustomPage';
import { OrderItemPage } from './OrderItemPage';

import layout from '@/styles/Layout.module.css';
import { ProducersList } from './ProducersList';
import ProducerDetails from './ProducerDetails';

const CHome = () => {
    return (
        <div className="customer-layout">
            <Routes>
                <Route path="/" element={<ProducersList />} />

                <Route path="/producer/:id" element={<ProducerDetails />} />

                <Route path="/my-orders" element={
                    <div className={layout.pageContainer}>
                        <h2>Мої замовлення</h2>
                        <p>Тут буде список ваших запитів...</p>
                    </div>
                } />

                <Route path="/order/custom/:producerId" element={<OrderCustomPage />} />
                <Route path="/order/item/:itemId" element={<OrderItemPage />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default CHome;