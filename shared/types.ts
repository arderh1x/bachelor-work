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

export type ProfileResponse = Producer | Customer;

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

export interface Order {
    id: number;
    customer_id: number;
    producer_id: number;
    furniture_id: number;
    status: OrderStatus;
    quantity: number;
    total_price: number;
    comment?: string;
    created_at: string;
}


export type CreateFurnitureDTO = Omit<Furniture, 'id' | 'created_at' | 'producer_id'>;
export type LoginDTO = Pick<User, 'username' | 'password'>;
export type RegisterDTO = Pick<User, 'username' | 'email' | 'password'>;
export type UpdateProfileDTO = Partial<Pick<Producer, 'workshop_name' | 'bio' | 'avatar_url'>>;
export type CreateOrderDTO = Pick<Order, 'furniture_id' | 'quantity' | 'comment'>

export interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}

export enum FurnitureCategory {
    TABLE = 'Table',
    CHAIR = 'Chair',
    WARDROBE = 'Wardrobe',
    BED = 'Bed',
    SOFA = 'Sofa',
    OTHER = 'Other'
}

export enum OrderStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled'
}