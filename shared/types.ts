export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    is_producer_mode: boolean;
}

export interface Producer {
    user_id: number;
    workshop_name: string;
    bio: string;
    avatar_url: string;
}

export interface Furniture {
    id: number;
    producer_id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
    image_url?: string;
    created_at: string;
}

export type CreateFurnitureDTO = Omit<Furniture, 'id' | 'created_at' | 'producer_id'>;
export type LoginDTO = Pick<User, 'username' | 'password'>;
export type RegisterDTO = Pick<User, 'username' | 'email' | 'password'>;

export interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}

export const FURN_CATEGORIES = {
    TABLE: 'Стіл',
    CHAIR: 'Стілець',
    WARDROBE: 'Шафа',
    BED: 'Ліжко',
    SOFA: 'Диван',
    OTHER: 'Інше'
} as const;

export type FurnitureCategory = typeof FURN_CATEGORIES[keyof typeof FURN_CATEGORIES];