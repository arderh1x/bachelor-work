import type { Furniture } from '@shared/types';
import { useState, useEffect } from 'react';

const Inventory = () => {
    const [items, setItems] = useState<Furniture[]>([]);
    const [formData, setFormData] = useState({ name: '', price: '', category: 'Стіл' });
    const [loading, setLoading] = useState(false);

    // 1. Завантаження товарів майстра
    const fetchInventory = async () => {
        try {
            const res = await fetch('/api/furniture/my'); // Твій роут для "моїх" товарів
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error('Помилка завантаження складу');
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    // 2. Додавання нового товару
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/furniture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', price: '', category: 'Стіл' });
                fetchInventory(); // Оновлюємо список
            }
        } catch (err) {
            alert('Помилка при збереженні');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
            {/* Форма ліворуч */}
            <section>
                <h2>Додати товар</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Назва меблів"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Ціна (грн)"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Стіл</option>
                        <option>Стілець</option>
                        <option>Шафа</option>
                        <option>Ліжко</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Збереження...' : 'Додати на склад'}
                    </button>
                </form>
            </section>

            {/* Список праворуч */}
            <section>
                <h2>Мій склад</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {items.length === 0 ? <p>На складі поки порожньо</p> : items.map(item => (
                        <div key={item.id} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <strong>{item.name}</strong>
                            <p>{item.category} — {item.price} грн</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Inventory;