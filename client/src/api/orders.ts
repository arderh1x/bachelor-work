import type { CreateOrderDTO, OrderWithDetails } from '@shared/types';
import api from './axios';

export const ordersApi = {
    create: (orderData: CreateOrderDTO) =>
        api.post<{ message: string; id: number }>('/api/orders', orderData).then(r => r.data),

    getMyOrders: () =>
        api.get<OrderWithDetails[]>('/api/orders').then(r => r.data),

    // updateStatus: (id: number, status: string) =>
    //     api.patch(`/api/orders/${id}`, { status })
    //         .then(res => res.data),
};