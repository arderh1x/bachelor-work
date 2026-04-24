import { AppBar, Toolbar, IconButton, Typography, Button, Stack, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Sun, Moon, Languages, LogOut, User as UserIcon, Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useToast } from '@/hooks/useToast';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { user, logout, toggleProducerMode } = useAuth();
    const { mode, toggleTheme } = useThemeMode();
    const { t, toggleLang } = useLang();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const theme = useTheme();
    // Визначаємо "вузькі" екрани (планшети та мобільні)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const isProducer = user?.is_producer_mode;

    const handleToggleMode = async () => {
        try {
            await toggleProducerMode();
            showToast(t('auth.mode_switched_success'), 'success');
            navigate('/');
        } catch (error) {
            console.error("Failed to toggle mode:", error);
            showToast(t('auth.mode_switched_error'), 'error');
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            className={`navbar-appbar ${isProducer ? 'navbar-producer' : 'navbar-customer'}`}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: isProducer ? 'var(--graphite-bg)' : 'var(--bg-white)',
                color: isProducer ? '#fff' : 'var(--text-main)',
                borderBottom: '1px solid var(--border-color)'
            }}
        >
            <Toolbar className="flex-between">
                <Stack direction="row" alignItems="center">
                    <IconButton
                        onClick={onMenuClick}
                        color="inherit"
                        sx={{ mr: 1, display: { md: 'none' } }}
                    >
                        <MenuIcon size={24} />
                    </IconButton>

                    <Typography
                        variant="h6"
                        onClick={() => navigate('/')}
                        className="nav-logo"
                        sx={{
                            cursor: 'pointer',
                            fontSize: isMobile ? '1.1rem' : '1.25rem' // Трохи менше на мобільних
                        }}
                    >
                        {t('brand')}
                    </Typography>

                    {/* На планшетах Home можна залишити, якщо мало пунктів, або сховати */}
                    {!isSmallScreen && (
                        <Stack direction="row" sx={{ ml: 2 }}>
                            <Button onClick={() => navigate('/')} color="inherit" sx={{ textTransform: 'none' }}>
                                {t('nav.home')}
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Stack direction="row" spacing={isSmallScreen ? 0.5 : 1} alignItems="center">
                    {user && (
                        <Tooltip title={isSmallScreen ? t('nav.mode_toggle') : ""}>
                            <Button
                                onClick={handleToggleMode}
                                variant={isProducer ? "contained" : "outlined"}
                                // На маленьких екранах залишаємо тільки іконку для економії місця
                                startIcon={<Repeat size={18} />}
                                className={`mode-toggle-btn ${isProducer ? 'mode-toggle-producer' : 'mode-toggle-customer'}`}
                                sx={{
                                    minWidth: isSmallScreen ? '40px' : 'auto',
                                    px: isSmallScreen ? 1 : 2,
                                    ".MuiButton-startIcon": { margin: isSmallScreen ? 0 : '' }
                                }}
                            >
                                {!isSmallScreen && (isProducer ? t('nav.mode_producer') : t('nav.mode_customer'))}
                            </Button>
                        </Tooltip>
                    )}

                    {/* Мова та тема (можна сховати лише на самих маленьких телефонах) */}
                    {!isMobile && (
                        <>
                            <IconButton onClick={toggleLang} color="inherit">
                                <Languages size={20} />
                            </IconButton>
                            <IconButton onClick={toggleTheme} color="inherit">
                                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </IconButton>
                        </>
                    )}

                    {user ? (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Button
                                onClick={() => navigate('/profile')}
                                color="inherit"
                                startIcon={<UserIcon size={18} />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    maxWidth: isSmallScreen ? '120px' : '200px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    display: 'flex'
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: 'block',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {user.username}
                                </Typography>
                            </Button>
                            <IconButton onClick={logout} color="error" size="small">
                                <LogOut size={20} />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Button onClick={() => navigate('/login')} variant="contained" color="primary" className="btn-base">
                            {t('nav.login')}
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;