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

export interface Customer {
    user_id: number;
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
export type UpdateProfileDTO = Partial<Pick<Producer, 'workshop_name' | 'bio' | 'avatar_url'>>;

export interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}

export enum FurnitureCategories {
    TABLE = 'Table',
    CHAIR = 'Chair',
    WARDROBE = 'Wardrobe',
    BED = 'Bed',
    SOFA = 'Sofa',
    OTHER = 'Other'
}

export type ProfileResponse = Producer | Customer;