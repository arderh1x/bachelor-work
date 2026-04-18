import api from './axios';
import type { Furniture, CreateFurnitureDTO } from '@shared/types';

const FURNITURE_URL = '/furniture';

export const furnitureApi = {
    create: (data: CreateFurnitureDTO) =>
        api.post<{ id: number; message: string }>(FURNITURE_URL, data),

    getMyFurniture: async () => {
        const response = await api.get<Furniture[]>('/furniture/my');
        return response.data;
    },

    delete: (id: number) =>
        api.delete(`${FURNITURE_URL}/${id}`),

    update: async (id: number, data: Partial<CreateFurnitureDTO>) => {
        const response = await api.put<Furniture>(`/furniture/${id}`, data);
        return response.data;
    },
};