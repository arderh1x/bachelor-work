import { useEffect, useState, useCallback } from 'react';
import { Typography, Button, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Plus } from 'lucide-react';

import { furnitureApi } from '@/api/furnitureApi';
import FurnitureList from '@/components/furniture/FurnitureList';
import { useLang } from '@/hooks/useLang';
import { useToast } from '@/hooks/useToast';
import { FurnitureCategory, type Furniture, type CreateFurnitureDTO } from '@shared/types';
import FurnitureBaseForm from '@/components/furniture/FurnitureBaseForm';

function InventoryPage() {
    const { t } = useLang();
    const { showToast } = useToast();

    const [items, setItems] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Furniture | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const data = await furnitureApi.getMyFurniture();
            setItems(data);
        } catch (error) {
            console.error('[InventoryPage] Failed to fetch furniture:', error);
            showToast(t('errors.fetch_failed'), 'error');
        }
        finally { setLoading(false) }
    }, [t, showToast]);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            if (isMounted) await fetchItems();
        };
        loadData();
        return () => {
            isMounted = false;
        };
    }, [fetchItems]);

    const handleOpenAdd = () => {
        setEditingItem(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (item: Furniture) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleSubmit = async (data: CreateFurnitureDTO) => {
        setSubmitting(true);
        try {
            if (editingItem) {
                await furnitureApi.update(editingItem.id, data);
                showToast(t('inventory.update_success'), 'success');
            } else {
                await furnitureApi.create(data);
                showToast(t('inventory.add_success'), 'success');
            }
            setModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("[InventoryPage] Failed to submit furniture add form:", error);
            showToast(t('errors.update_failed'), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(t('inventory.delete_confirm'))) return;
        try {
            await furnitureApi.delete(id);
            showToast(t('common.delete_success'), 'success');
            fetchItems();
        } catch (error) {
            console.error("[InventoryPage] Failed to delete furniture:", error);
            showToast(t('errors.delete_failed'), 'error');
        }
    };

    return (
        <Box component="main" className="page-container fade-in">
            <Box className="section-header-row">
                <Box>
                    <Typography variant="h4" className="page-title">
                        {t('inventory.title')}
                    </Typography>
                </Box>

                <Button onClick={handleOpenAdd} variant="contained" startIcon={<Plus size={20} />} className="btn-base">
                    {t('inventory.add_item')}
                </Button>
            </Box>
            <FurnitureList onDelete={handleDelete} onEdit={handleOpenEdit}
                items={items} loading={loading} mode="producer" />

            <Dialog onClose={() => !submitting && setModalOpen(false)} open={modalOpen}
                fullWidth maxWidth="sm" PaperProps={{ className: "app-card" }}>
                <DialogTitle className="dialog-header-title">
                    {editingItem ? t('inventory.edit_item') : t('inventory.add_item')}
                </DialogTitle>

                <DialogContent className="dialog-body-padding">
                    <FurnitureBaseForm onSubmit={handleSubmit} onCancel={() => setModalOpen(false)}
                        submitText={editingItem ? t('common.save') : t('inventory.add_item')}
                        isSubmitting={submitting} key={editingItem?.id || 'new'}
                        initialData={editingItem || {
                            name: '',
                            price: 0,
                            category: FurnitureCategory.OTHER,
                            description: '',
                            image_url: ''
                        }} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default InventoryPage;