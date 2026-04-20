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
    payment_methods: string;
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
    image_url?: string | undefined;
    created_at: string;
}

export interface Order {
    id: number;
    customer_id: number;
    producer_id: number;
    furniture_id: number;
    price_at_order: number;
    status: OrderStatus;
    quantity: number;
    comment: string | null;
    phone: string;
    delivery_address: string;
    created_at: string;
}

export interface OrderWithDetails extends Order {
    furniture?: Furniture;
    producer?: Producer & { username: string };
    customer?: Customer & { username: string };
    total_price: number;
}

export interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}

export type CreateFurnitureDTO = Omit<Furniture, 'id' | 'created_at' | 'producer_id'>;
export type LoginDTO = Pick<User, 'username' | 'password'>;
export type RegisterDTO = Pick<User, 'username' | 'email' | 'password'>;
export type UpdateProfileDTO = Partial<Pick<Producer, 'workshop_name' | 'bio' | 'avatar_url' | 'payment_methods'>>;
export type CreateOrderDTO = Pick<Order, 'quantity' | 'comment' | 'phone' | 'delivery_address'> & {
    furniture_id?: number;
    producer_id?: number;
    customFurniture?: CreateFurnitureDTO
};

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
    PAID = 'Paid',
    CANCELLED = 'Cancelled'
}