import type { Request, Response } from 'express';
import type { CreateOrderDTO, OrderStatus, OrderWithDetails, Furniture } from '@shared/types.js';
import db from '@/db/database.js';
import { insertFurniture } from './furnitureController.js';

export const createOrder = async (req: Request, res: Response) => {
    const {
        furniture_id,
        customFurniture,
        producer_id,
        quantity = 1,
        phone,
        delivery_address,
        comment
    } = req.body;

    const customer_id = req.user.id;

    try {
        db.exec("BEGIN");
        let finalFurnitureId = furniture_id;
        let finalProducerId = producer_id;
        let finalPrice = 0;

        if (customFurniture) {
            finalFurnitureId = Number(insertFurniture(producer_id, customFurniture, 1));
            finalPrice = customFurniture.price;
        } else {
            const item = db.prepare('SELECT producer_id, price FROM furniture WHERE id = ?')
                .get(furniture_id) as { producer_id: number, price: number } | undefined;

            if (!item) {
                db.exec("ROLLBACK");
                return res.status(404).json({ error: "Furniture not found" });
            }
            finalPrice = item.price;
            finalProducerId = item.producer_id;
        }

        const result = db.prepare(`
            INSERT INTO orders (
                customer_id, producer_id, furniture_id, 
                quantity, price_at_order, phone, 
                delivery_address, comment, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
        `).run(
            customer_id,
            finalProducerId,
            finalFurnitureId,
            quantity,
            finalPrice,
            phone,
            delivery_address,
            comment || null
        );

        db.exec("COMMIT");

        res.status(201).json({ message: "Order created", id: result.lastInsertRowid });
    } catch (error: any) {
        db.exec("ROLLBACK");
        console.error("Order error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getOrders = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const isProducer = req.user.is_producer_mode;

    try {
        let rows;
        if (isProducer) {
            rows = db.prepare(`
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
            `).all(userId) as any[];
        } else {
            rows = db.prepare(`
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
            `).all(userId) as any[];
        }

        const orders: OrderWithDetails[] = rows.map(row => {
            const order: OrderWithDetails = {
                id: row.id as number,
                customer_id: row.customer_id as number,
                producer_id: row.producer_id as number,
                furniture_id: row.furniture_id as number,
                quantity: row.quantity as number,
                price_at_order: row.price_at_order as number,
                status: row.status as OrderStatus,
                comment: row.comment ? String(row.comment) : null,
                phone: String(row.phone),
                delivery_address: String(row.delivery_address),
                created_at: String(row.created_at),
                total_price: (row.quantity as number) * (row.price_at_order as number),
            };

            if (row.f_name) {
                const furniture: Furniture = {
                    id: row.furniture_id as number,
                    producer_id: row.producer_id as number,
                    name: String(row.f_name),
                    price: row.f_price as number,
                    category: String(row.f_category),
                    created_at: String(row.f_created_at)
                };
                if (row.f_image) furniture.image_url = String(row.f_image);

                order.furniture = furniture;
            }

            if (isProducer && row.c_username) {
                order.customer = {
                    user_id: row.customer_id as number,
                    username: String(row.c_username),
                    bio: String(row.c_bio || ''),
                    avatar_url: String(row.c_avatar || '')
                };
            }

            if (!isProducer && row.p_workshop) {
                order.producer = {
                    user_id: row.producer_id as number,
                    workshop_name: String(row.p_workshop),
                    username: String(row.p_username),
                    bio: String(row.p_bio || ''),
                    payment_methods: String(row.p_payment || ''),
                    avatar_url: String(row.p_avatar || '')
                };
            }

            return order;
        });

        res.json(orders);
    } catch (error) {
        console.error("Fetch orders error:", error);
        res.status(500).json({ message: "Server error on getting orders list." });
    }
};