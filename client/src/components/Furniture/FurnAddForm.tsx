import { useState } from 'react';
import { furnitureApi } from '@/api/furniture';
import { FurnitureCategories } from '@shared/types';
import type { CreateFurnitureDTO } from '@shared/types';
import { FurnBaseForm } from './FurnBaseForm';

interface AddProps {
    onSuccess: () => void;
}

export const FurnAddForm = ({ onSuccess }: AddProps) => {
    const [loading, setLoading] = useState(false);

    const handleAdd = async (data: CreateFurnitureDTO) => {
        setLoading(true);
        try {
            await furnitureApi.create(data);
            onSuccess();
            alert('Створено!');
        } catch (error) {
            console.error(error)
            alert('Помилка');
        }
        finally { setLoading(false); }
    };

    return (
        <FurnBaseForm
            initialData={{ name: '', price: 0, category: FurnitureCategories.OTHER, description: '', image_url: '' }}
            onSubmit={handleAdd}
            submitText="Додати товар"
            isSubmitting={loading}
        />
    );
};