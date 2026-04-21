import db from '../db/database.js';

export const ProfileModel = {
    getAllProducers() {
        const rows = db.prepare(`
            SELECT user_id, workshop_name, bio, avatar_url, payment_methods 
            FROM producer_profiles
        `).all();
        return rows as any[];
    },

    getProducerById(id: number) {
        return db.prepare(`
            SELECT user_id, workshop_name, bio, avatar_url, payment_methods 
            FROM producer_profiles 
            WHERE user_id = ?
        `).get(id) as any | undefined;
    },

    getCustomerById(id: number) {
        return db.prepare(`
            SELECT bio, avatar_url 
            FROM customer_profiles 
            WHERE user_id = ?
        `).get(id) as any | undefined;
    },

    updateProducer(userId: number, data: any) {
        const { workshop_name, bio, avatar_url, payment_methods } = data;
        return db.prepare(`
            UPDATE producer_profiles 
            SET workshop_name = ?, bio = ?, avatar_url = ?, payment_methods = ? 
            WHERE user_id = ?
        `).run(workshop_name ?? null, bio ?? null, avatar_url ?? null, payment_methods ?? null, userId);
    },

    updateCustomer(userId: number, data: any) {
        const { bio, avatar_url } = data;
        return db.prepare(`
            UPDATE customer_profiles 
            SET bio = ?, avatar_url = ? 
            WHERE user_id = ?
        `).run(bio ?? null, avatar_url ?? null, userId);
    }
};