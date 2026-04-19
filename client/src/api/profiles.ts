import type { Producer, ProfileResponse, UpdateProfileDTO } from "@shared/types";
import api from "./axios";

const PROFILES_URL = '/profiles';

export const profilesApi = {
    getMe: async (): Promise<ProfileResponse> =>
        api.get(`${PROFILES_URL}/me`).then(r => r.data),

    updateMe: async (data: UpdateProfileDTO): Promise<{ message: string }> =>
        api.put(`${PROFILES_URL}/me`, data).then(r => r.data),

    getById: async (id: number): Promise<Producer> => 
        api.get(`${PROFILES_URL}/producers/${id}`).then(r => r.data),
};
