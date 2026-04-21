import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderCustomPage } from './OrderCustomPage';
import { OrderItemPage } from './OrderItemPage';

import layout from '@/styles/Layout.module.css';
import { ProducersList } from './ProducersList';
import ProducerDetails from './ProducerDetails';
import { OrderList } from '@/components/Order/OrdersList';

const CHome = () => {
    return (
        <div className="customer-layout">
            <Routes>
                <Route path="/" element={<ProducersList />} />

                <Route path="/producer/:id" element={<ProducerDetails />} />

                <Route path="/my-orders" element={
                    <div className={layout.pageContainer}>
                        <header className={layout.header}>
                            <h2 className={layout.title}>Мої замовлення</h2>
                        </header>

                        <OrderList mode="customer" />
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