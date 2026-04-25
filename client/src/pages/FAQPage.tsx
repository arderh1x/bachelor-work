import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

function FAQPage() {
    const { t } = useLang();

    const faqKeys = ['how_it_works', 'payment', 'delivery'];

    return (
        <Container maxWidth="md" className="fade-in page-container">
            <Box className="page-hero-header">
                <Box className="page-hero-icon">
                    <HelpCircle size={40} />
                </Box>

                <Typography variant="h3" className="page-title">
                    {t('faq.title')}
                </Typography>
            </Box>

            <Box className="faq-list">
                {faqKeys.map((key) => {
                    const answerParagraphs = t(`faq.questions.${key}.answer`, { returnObjects: true });

                    return (
                        <Accordion key={key} disableGutters elevation={0} className="app-card faq-accordion">
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}
                                className="dialog-header-title faq-accordion-summary">
                                <Typography variant="h6">
                                    {t(`faq.questions.${key}.question`)}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails className="dialog-body-padding">
                                {Array.isArray(answerParagraphs) && answerParagraphs.map((paragraph, index) => (
                                    <Typography key={index} variant="body1" className="faq-answer-paragraph">
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