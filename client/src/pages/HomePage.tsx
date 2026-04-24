import { Box, Typography } from '@mui/material';
import { ProducersList } from '@/components/producer/ProducersList';
import { useLang } from '@/hooks/useLang';

function HomePage() {
    const { t } = useLang();

    return (
        <Box component="main" className="page-container fade-in">
            {/* Секція заголовку сторінки */}
            <Box component="header" className="section-header">
                <Typography variant="h4" className="page-title">
                    {t('home.title')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {t('home.subtitle')}
                </Typography>
            </Box>

            {/* Список виробників (вже містить Grid всередині) */}
            <ProducersList />
        </Box>
    );
}

export default HomePage;