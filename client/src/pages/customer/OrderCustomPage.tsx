import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FurnitureCategory, type CreateFurnitureDTO, type CreateOrderDTO } from '@shared/types';
import { ordersApi } from '@/api/orders';

import layout from '@/styles/Layout.module.css';
import styles from './OrderCustom.module.css';
import { OrderForm, type OrderContactData } from '@/components/Order/OrderForm';
import { FurnBaseForm } from '@/components/Furniture/FurnBaseForm';

export const OrderCustomPage = () => {
    const { producerId } = useParams<{ producerId: string }>();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [furnData, setFurnData] = useState<CreateFurnitureDTO | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNextStep = (data: CreateFurnitureDTO) => {
        setFurnData(data);
        setStep(2);
    };

    const handleFinalSubmit = (contactData: OrderContactData) => {
        if (!furnData || !producerId) return;
        setIsSubmitting(true);

        const fullOrder: CreateOrderDTO = {
            producer_id: Number(producerId),
            customFurniture: furnData,
            ...contactData
        };

        ordersApi.create(fullOrder)
            .then(() => {
                alert('Замовлення успішно створено!');
                navigate(`/producer/${producerId}`);
            })
            .catch(() => alert('Помилка при створенні замовлення'))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <div className={layout.pageContainer}>
            <div className={styles.orderCard}>
                <header className={styles.pageHeader}>
                    <h2>Індивідуальне замовлення</h2>
                    <p>Крок {step} з 2</p>
                </header>

                <div className={styles.stepper}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                        <span>1</span> Параметри виробу
                    </div>
                    <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>
                        <span>2</span> Контакти та доставка
                    </div>
                </div>

                <main className={styles.formContent}>
                    {step === 1 ? (
                        <FurnBaseForm
                            initialData={
                                furnData || {
                                    name: '',
                                    price: 0,
                                    category: FurnitureCategory.OTHER,
                                    description: '',
                                    image_url: null
                                }
                            }
                            onSubmit={handleNextStep}
                            submitText="Далі до контактів"
                            onCancel={() => navigate(-1)}
                            isSubmitting={false}
                        />
                    ) : (
                        <OrderForm
                            onSubmit={handleFinalSubmit}
                            onCancel={() => setStep(1)}
                            showQuantity={false}
                            submitText={isSubmitting ? "Оформлення..." : "Підтвердити замовлення"}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};