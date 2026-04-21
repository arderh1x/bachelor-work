interface Timestamps {
    created_at: string;
}

interface ContactFields {
    phone: string;
    delivery_address: string;
    comment: string | null;
}

interface BaseProfile {
    bio: string;
    avatar_url: string;
}


export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    is_producer_mode: boolean;
}

export interface Producer extends BaseProfile {
    user_id: number;
    workshop_name: string;
    payment_methods: string;
}

export interface Customer extends BaseProfile {
    user_id: number;
}

export interface Furniture extends Timestamps {
    id: number;
    producer_id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
    image_url?: string;
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
export type UpdateProfileDTO = Partial<Omit<Producer, 'user_id'>>;

export type LoginDTO = Pick<User, 'username' | 'password'>;
export type RegisterDTO = Pick<User, 'username' | 'email' | 'password'>;

export type CreateFurnitureDTO = Omit<Furniture, 'id' | keyof Timestamps | 'producer_id'>;

export type OrderContactDetails = Pick<Order, 'quantity' | keyof ContactFields>;

export interface OrderWithDetails extends Order {
    furniture?: Furniture;
    producer?: Producer & { username: string };
    customer?: Customer & { username: string };
    total_price: number;
}

export interface CreateOrderDTO extends OrderContactDetails {
    furniture_id?: number;
    producer_id?: number;
    customFurniture?: CreateFurnitureDTO;
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