import db from '../db/database.js';
import type { OrderStatus } from '@shared/types.js';

export const OrderModel = {
    create(data: any) {
        const { customer_id, producer_id, furniture_id, quantity, price_at_order, phone, delivery_address, comment } = data;

        const stmt = db.prepare(`
            INSERT INTO orders (
                customer_id, producer_id, furniture_id, 
                quantity, price_at_order, phone, 
                delivery_address, comment, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
        `);

        return stmt.run(
            customer_id, producer_id, furniture_id,
            quantity, price_at_order, phone,
            delivery_address, comment ?? null
        );
    },

    getForProducer(producerId: number) {
        return db.prepare(`
            SELECT 
                o.*,
                f.name as f_name, f.price as f_price, f.category as f_category, 
                f.image_url as f_image, f.created_at as f_created_at,
                u.username as c_username, 
                cp.bio as c_bio, cp.avatar_url as c_avatar
            FROM orders o
            LEFT JOIN furniture f ON o.furniture_id = f.id
            JOIN users u ON o.customer_id = u.id
            LEFT JOIN customer_profiles cp ON u.id = cp.user_id
            WHERE o.producer_id = ?
            ORDER BY o.created_at DESC
        `).all(producerId) as any[];
    },

    getForCustomer(customerId: number) {
        return db.prepare(`
            SELECT 
                o.*, 
                f.name as f_name, f.price as f_price, f.category as f_category, 
                f.image_url as f_image, f.created_at as f_created_at,
                p.workshop_name as p_workshop, p.bio as p_bio, 
                p.avatar_url as p_avatar, u.username as p_username
            FROM orders o
            LEFT JOIN furniture f ON o.furniture_id = f.id
            JOIN producer_profiles p ON o.producer_id = p.user_id
            JOIN users u ON p.user_id = u.id
            WHERE o.customer_id = ?
            ORDER BY o.created_at DESC
        `).all(customerId) as any[];
    },

    updateStatus(orderId: number, producerId: number, status: string) {
        return db.prepare('UPDATE orders SET status = ? WHERE id = ? AND producer_id = ?')
            .run(status, orderId, producerId);
    },

    getByIdAndProducer(orderId: number, producerId: number) {
        return db.prepare('SELECT id FROM orders WHERE id = ? AND producer_id = ?')
            .get(orderId, producerId);
    }
};