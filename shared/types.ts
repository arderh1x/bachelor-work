export interface User {
    id: number;
    username: string;
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
    name: string;
    price: number;
    category: string;
}

export interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}