import { Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';
import { Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import type { Producer } from '@shared/types';

export const ProducerCard = ({ producer }: { producer: Producer }) => {
    const { t } = useLang();
    const navigate = useNavigate();

    return (
        <Card className="app-card producer-card">
            {/* Верхня частина з градієнтом та аватаром */}
            <Box className="producer-card-header">
                <Avatar
                    src={producer.avatar_url || ''}
                    className="producer-avatar-wrap"
                >
                    {!producer.avatar_url && <Store size={32} />}
                </Avatar>
            </Box>

            <CardContent className="producer-info">
                <Typography variant="h6" className="card-title text-truncate">
                    {producer.workshop_name || t('home.private_workshop')}
                </Typography>

                <Typography variant="body2" className="producer-bio">
                    {producer.bio || t('home.no_bio')}
                </Typography>

                <Button
                    onClick={() => navigate(`/producer/${producer.user_id}`)}
                    variant="outlined"
                    fullWidth
                    className="btn-base"
                    endIcon={<ArrowRight size={18} />}
                >
                    {t('home.view_workshop')}
                </Button>
            </CardContent>
        </Card>
    );
};