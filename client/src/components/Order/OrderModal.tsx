import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import { FurnitureCategory, type Furniture, type CreateFurnitureDTO, type CreateOrderDTO } from '@shared/types';
import { ordersApi } from '@/api/ordersApi';
import { useLang } from '@/hooks/useLang';
import { OrderForm, type OrderContactData } from './OrderForm';
import { FurnitureBaseForm } from '@/components/furniture/FurnitureBaseForm';

interface Props {
    open: boolean;
    onClose: () => void;
    producerId: number;
    furnitureItem?: Furniture | null;
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

export const OrderModal = ({ open, onClose, producerId, furnitureItem, onSuccess, onError }: Props) => {
    const { t } = useLang();

    const [activeStep, setActiveStep] = useState(0);
    const [furnData, setFurnData] = useState<CreateFurnitureDTO | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [t('orders.step_params'), t('orders.step_delivery')];

    const handleClose = useCallback(() => {
        setActiveStep(0);
        setFurnData(null);
        onClose();
    }, [onClose]);

    const handleNextStep = (data: CreateFurnitureDTO) => {
        setFurnData(data);
        setActiveStep(1);
    };

    const handleFinalSubmit = async (contactData: OrderContactData) => {
        setIsSubmitting(true);
        try {
            const fullOrder: CreateOrderDTO = {
                producer_id: producerId,
                furniture_id: furnitureItem?.id,
                customFurniture: !furnitureItem ? (furnData || undefined) : undefined,
                ...contactData
            };

            await ordersApi.create(fullOrder);
            onSuccess(t('orders.success_message'));
            handleClose();
        } catch {
            onError(t('errors.order_failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentStep = furnitureItem ? 1 : activeStep;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ className: 'app-card' }}
        >
            <DialogTitle className="dialog-header-title">
                {furnitureItem
                    ? `${t('orders.item_title')}: ${furnitureItem.name}`
                    : t('orders.custom_title')}
            </DialogTitle>

            <DialogContent className="dialog-body-padding">
                {!furnitureItem && (
                    <Stepper
                        activeStep={currentStep}
                        className="form-container-padding"
                        sx={{ mb: 3 }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}

                {furnitureItem && (
                    <Box className="info-box-padding">
                        <Typography variant="body2" className="price-text-secondary">
                            {t('inventory.price')}: {furnitureItem.price} {t('common.currency')}
                        </Typography>
                    </Box>
                )}

                {currentStep === 0 ? (
                    <FurnitureBaseForm
                        onSubmit={handleNextStep}
                        onCancel={handleClose}
                        isSubmitting={false}
                        submitText={t('common.next')}
                        initialData={furnData || {
                            name: '',
                            price: 0,
                            category: FurnitureCategory.OTHER,
                            description: '',
                            image_url: null
                        }}
                    />
                ) : (
                    <OrderForm
                        onSubmit={handleFinalSubmit}
                        onCancel={() => furnitureItem ? handleClose() : setActiveStep(0)}
                        showQuantity={!!furnitureItem}
                        isSubmitting={isSubmitting}
                        submitText={t('orders.confirm')}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};