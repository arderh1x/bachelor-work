interface Timestamps {
    created_at: string;
}

interface ContactFields {
    phone: string;
    delivery_address: string;
    comment: string | null;
}

interface BaseProfile {
    bio: string | null;
    avatar_url: string | null;
}


export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    is_producer_mode: boolean;
}

interface Profile extends BaseProfile {
    user_id: number;
}

export interface Producer extends Profile {
    workshop_name: string;
    payment_methods: string | null;
}

export interface Customer extends Profile { }

export interface Furniture extends Timestamps {
    id: number;
    producer_id: number;
    name: string;
    price: number;
    category: FurnitureCategory;
    description: string | null;
    image_url: string | null;
    is_custom: boolean;
}

export interface Order extends Timestamps, ContactFields {
    id: number;
    customer_id: number;
    producer_id: number;
    furniture_id: number;
    price_at_order: number;
    status: OrderStatus;
    quantity: number;
}


export type ProfileResponse = Producer | Customer;
export type UpdateProfileDTO = Partial<Omit<Producer, 'user_id'>> & Partial<Customer>;

export type LoginDTO = Pick<User, 'username' | 'password'>;
export type RegisterDTO = Pick<User, 'username' | 'email' | 'password'>;

export type CreateFurnitureDTO = Omit<Furniture, 'id' | keyof Timestamps | 'producer_id' | 'is_custom'>;

export interface CreateOrderDTO extends ContactFields {
    quantity: number;
    furniture_id?: number;
    producer_id: number;
    customFurniture?: CreateFurnitureDTO;
}

export interface OrderWithDetails extends Order {
    furniture: Furniture | null;
    producer?: Producer & { username: string };
    customer?: Customer & { username: string };
    total_price: number;
}

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
    IN_PROGRESS = 'In-Progress',
    SHIPPED = 'Shipped',
    COMPLETED = 'Completed',
    REJECTED = 'Rejected',
    CANCELLED = 'Cancelled'
}