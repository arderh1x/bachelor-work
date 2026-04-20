import type { CreateOrderDTO, OrderWithDetails } from '@shared/types';
import api from './axios';

const ORDERS_URL = '/orders';

export const ordersApi = {
    create: (orderData: CreateOrderDTO) =>
        api.post<{ message: string; id: number }>(ORDERS_URL, orderData).then(r => r.data),

    getMyOrders: () =>
        api.get<OrderWithDetails[]>(ORDERS_URL).then(r => r.data),

    // updateStatus: (id: number, status: string) =>
    //     api.patch(`/api/orders/${id}`, { status })
    //         .then(res => res.data),
};