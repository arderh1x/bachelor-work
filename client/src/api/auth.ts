import api from './axios';
import type { User, LoginDTO, RegisterDTO } from '@shared/types';

const AUTH_URL = '/auth';

export const authApi = {
    login: (data: LoginDTO) =>
        api.post<{ user: User }>(`${AUTH_URL}/login`, data),

    register: (data: RegisterDTO) =>
        api.post(`${AUTH_URL}/register`, data),

    logout: () =>
        api.post(`${AUTH_URL}/logout`),

    refresh: () =>
        api.get<{ user: User }>(`${AUTH_URL}/refresh`),

    toggleMode: () =>
        api.post<{ is_producer_mode: boolean }>(`${AUTH_URL}/toggle-mode`),
};