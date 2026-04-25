import {
    Box,
    Typography,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

function FAQPage() {
    const { t } = useLang();

    // Ключі питань, які відповідають структурі в ua.ts/en.ts
    const faqKeys = ['how_it_works', 'payment', 'delivery'];

    return (
        <Container maxWidth="md" className="fade-in page-container">
            {/* Заголовок сторінки (використовуємо твій клас для центрованих хедерів) */}
            <Box className="section-header-row" sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box className="not-found-icon-circle">
                    <HelpCircle size={40} />
                </Box>
                <Typography variant="h3" className="page-title">
                    {t('faq.title')}
                </Typography>
            </Box>

            {/* Список питань (використовуємо твій клас для вертикальних списків) */}
            <Box className="orders-stack" sx={{ mt: 4 }}>
                {faqKeys.map((key) => {
                    // Явне приведення до масиву рядків для уникнення помилок TS
                    const answerParagraphs = t(`faq.questions.${key}.answer`, { returnObjects: true }) as unknown as string[];

                    return (
                        <Accordion
                            key={key}
                            className="app-card"
                            disableGutters
                            elevation={0}
                            sx={{
                                mb: 2,
                                '&:before': { display: 'none' },
                                overflow: 'hidden'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ChevronDown size={20} />}
                                className="dialog-header-title"
                                sx={{ borderBottom: 'none' }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {t(`faq.questions.${key}.question`)}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="dialog-body-padding">
                                {Array.isArray(answerParagraphs) && answerParagraphs.map((paragraph, index) => (
                                    <Typography
                                        key={index}
                                        variant="body1"
                                        className="not-found-desc"
                                        sx={{
                                            mb: index === answerParagraphs.length - 1 ? 0 : 2,
                                            maxWidth: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {paragraph}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </Container>
    );
};

export default FAQPage;