import type { RequestHandler } from 'express';
import { OrderModel } from '../models/orderModel.js';
import { FurnitureModel } from '../models/furnitureModel.js';
import db from '../db/database.js';

export const createOrder: RequestHandler = async (req, res) => {
    const { furniture_id, customFurniture, producer_id, quantity = 1, phone, delivery_address, comment } = req.body;
    const customer_id = req.user.id;

    try {
        db.exec("BEGIN");
        let finalFurnitureId = furniture_id;
        let finalProducerId = producer_id;
        let finalPrice = 0;

        if (customer_id === finalProducerId) {
            db.exec("ROLLBACK");
            return res.status(400).json({ error: "You cannot order from yourself." });
        }

        if (customFurniture) {
            finalFurnitureId = Number(FurnitureModel.create(finalProducerId, customFurniture, 1));
            finalPrice = customFurniture.price;
        } else {
            const item = FurnitureModel.getById(furniture_id);
            if (!item) {
                db.exec("ROLLBACK");
                return res.status(404).json({ error: "Furniture not found." });
            }
            finalPrice = item.price;
            finalProducerId = item.producer_id;
        }

        const result = OrderModel.create({
            customer_id,
            producer_id: finalProducerId,
            furniture_id: finalFurnitureId,
            quantity,
            price_at_order: finalPrice,
            phone,
            delivery_address,
            comment
        });

        db.exec("COMMIT");
        res.status(201).json({ message: "Order created successfully", id: result.lastInsertRowid });

    } catch (error) {
        db.exec("ROLLBACK");
        console.error("[OrdersController: createOrder] Error:", error);
        res.status(500).json({ error: "Internal server error while creating order." });
    }
};

export const getOrders: RequestHandler = (req, res) => {
    const userId = req.user.id;
    const isProducer = req.user.is_producer_mode;

    try {
        const rows = isProducer ? OrderModel.getForProducer(userId) : OrderModel.getForCustomer(userId);

        const orders = rows.map(row => ({
            id: row.id,
            status: row.status,
            total_price: row.quantity * row.price_at_order,
            created_at: row.created_at,
            phone: row.phone,
            delivery_address: row.delivery_address,
            comment: row.comment,
            furniture: row.f_name ? {
                id: row.furniture_id,
                name: row.f_name,
                price: row.f_price,
                image_url: row.f_image
            } : null,
            ...(isProducer ? { customer: { username: row.c_username, avatar: row.c_avatar } }
                : { producer: { workshop: row.p_workshop, username: row.p_username } })
        }));

        res.json(orders);
    } catch (error) {
        console.error("[OrdersController: getOrders] Error:", error);
        res.status(500).json({ error: "Internal server error while fetching orders." });
    }
};

export const updateOrderStatus: RequestHandler = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const producerId = req.user.id;

    try {
        const result = OrderModel.updateStatus(Number(id), producerId, status);
        if (result.changes === 0) {
            return res.status(404).json({ error: "Order not found or access denied." });
        }
        res.json({ message: `Order status updated to ${status}` });
    } catch (error) {
        console.error("[OrdersController: updateOrderStatus] Error:", error);
        res.status(500).json({ error: "Internal server error while updating status." });
    }
};