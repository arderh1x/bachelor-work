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

function Navbar({ onMenuClick }: NavbarProps) {
    const { user, logout, toggleProducerMode } = useAuth();
    const { mode, toggleTheme } = useThemeMode();
    const { t, toggleLang } = useLang();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const isProducer = user?.is_producer_mode;

    const handleToggleMode = async () => {
        try {
            await toggleProducerMode();
            showToast(t('auth.mode_switched_success'), 'success');
            navigate('/');
        } catch (error) {
            console.error('[Navbar] Failed to toggle mode:', error);
            showToast(t('auth.mode_switched_error'), 'error');
        }
    };

    return (
        <AppBar position="fixed" elevation={0}
            className={`navbar-appbar ${isProducer ? 'navbar-producer' : 'navbar-customer'}`}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

            <Toolbar className="flex-between">
                <Stack direction="row" alignItems="center">
                    <IconButton onClick={onMenuClick} sx={{ mr: 1, display: { md: 'none' } }}>
                        <MenuIcon size={24} />
                    </IconButton>

                    <Typography variant="h6" onClick={() => navigate('/')} className="nav-logo"
                        sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                        {t('brand')}
                    </Typography>

                    {!isSmallScreen && (
                        <Stack direction="row" sx={{ ml: 2 }}>
                            <Button onClick={() => navigate('/')} className="nav-btn-text">
                                {t('nav.home')}
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Stack direction="row" spacing={isSmallScreen ? 0.5 : 1} alignItems="center">
                    {user && (
                        <Tooltip title={isSmallScreen ? t('nav.mode_toggle') : ''}>
                            <Button onClick={handleToggleMode} variant={isProducer ? 'contained' : 'outlined'}
                                startIcon={<Repeat size={18} />}
                                className={`mode-toggle-btn ${isProducer ? 'mode-toggle-producer' : 'mode-toggle-customer'}`}
                                sx={{
                                    minWidth: isSmallScreen ? '40px' : 'auto',
                                    px: isSmallScreen ? 1 : 2,
                                    '.MuiButton-startIcon': { margin: isSmallScreen ? 0 : '' },
                                }}>
                                {!isSmallScreen && (isProducer ? t('nav.mode_producer') : t('nav.mode_customer'))}
                            </Button>
                        </Tooltip>
                    )}

                    {!isMobile && (
                        <>
                            <IconButton onClick={toggleLang}>
                                <Languages size={20} />
                            </IconButton>

                            <IconButton onClick={toggleTheme}>
                                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </IconButton>
                        </>
                    )}

                    {user ? (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Button onClick={() => navigate('/profile')} startIcon={<UserIcon size={18} />}
                                className="nav-profile-btn" sx={{ maxWidth: isSmallScreen ? '120px' : '200px' }}>
                                <Typography variant="body2" className="nav-user-name">
                                    {user.username}
                                </Typography>
                            </Button>

                            <IconButton onClick={logout} color="error" size="small">
                                <LogOut size={20} />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Button onClick={() => navigate('/login')} variant="contained" className="btn-base">
                            {t('nav.login')}
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;