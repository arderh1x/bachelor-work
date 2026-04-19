import api from './axios';
import type { Furniture, CreateFurnitureDTO } from '@shared/types';

const FURNITURE_URL = '/furniture';

export const furnitureApi = {
    create: (data: CreateFurnitureDTO) =>
        api.post<{ id: number; message: string }>(FURNITURE_URL, data).then(r => r.data),

    getMyFurniture: () =>
        api.get<Furniture[]>(`${FURNITURE_URL}/my`).then(r => r.data),

    getByProducer: (id: number) =>
        api.get<Furniture[]>(`${FURNITURE_URL}/producer/${id}`).then(r => r.data),

    delete: (id: number) =>
        api.delete(`${FURNITURE_URL}/${id}`),

    update: (id: number, data: Partial<CreateFurnitureDTO>) =>
        api.put<{ message: string }>(`${FURNITURE_URL}/${id}`, data).then(r => r.data),
};