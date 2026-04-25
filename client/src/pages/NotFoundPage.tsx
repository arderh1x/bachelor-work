import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';

function NotFoundPage() {
    const navigate = useNavigate();
    const { t } = useLang();

    return (
        <Container className="fade-in not-found-wrapper">
            <h1 className="not-found-code">404</h1>

            <Box className="not-found-content">
                <Box className="page-hero-icon">
                    <Construction size={48} />
                </Box>

                <Typography variant="h3" className="page-title">
                    {t('errors.page_not_found')}
                </Typography>

                <Typography variant="body1" className="page-desc">
                    {t('errors.page_not_found_desc')}
                </Typography>

                <Box className="actions-group">
                    <Button onClick={() => navigate(-1)} variant="outlined"
                        startIcon={<ArrowLeft size={20} />} className="btn-base">
                        {t('common.back')}
                    </Button>

                    <Button onClick={() => navigate('/')} variant="contained"
                        startIcon={<Home size={20} />} className="btn-base">
                        {t('nav.home')}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default NotFoundPage;