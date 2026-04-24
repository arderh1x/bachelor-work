import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useLang();

    return (
        <Container className="fade-in not-found-wrapper">
            {/* Великий фоновий напис */}
            <h1 className="not-found-code">404</h1>

            <Box className="not-found-content">
                {/* Іконка в колі */}
                <Box className="not-found-icon-circle">
                    <Construction size={48} />
                </Box>

                <Typography variant="h3" className="page-title" sx={{ mb: 1 }}>
                    {t('errors.page_not_found')}
                </Typography>

                <Typography variant="body1" className="not-found-desc">
                    {t('errors.page_not_found_desc')}
                </Typography>

                {/* Кнопки дій */}
                <Box className="actions-group" sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outlined"
                        startIcon={<ArrowLeft size={20} />}
                        className="btn-base"
                    >
                        {t('common.back')}
                    </Button>

                    <Button
                        onClick={() => navigate('/')}
                        variant="contained"
                        startIcon={<Home size={20} />}
                        className="btn-base"
                    >
                        {t('nav.home')}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default NotFoundPage;