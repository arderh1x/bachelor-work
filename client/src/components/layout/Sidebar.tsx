import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Toolbar, useMediaQuery, useTheme, Typography } from '@mui/material';
import { LayoutDashboard, Package, ClipboardList, HelpCircle, Repeat, Languages, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { useThemeMode } from '@/hooks/useThemeMode';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
    const { user, toggleProducerMode } = useAuth();
    const { t, toggleLang } = useLang();
    const { mode, toggleTheme } = useThemeMode();
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isProducer = user?.is_producer_mode;

    const menuItems = [
        { text: t('sidebar.home'), path: '/', icon: <LayoutDashboard size={20} />, visible: true },
        { text: t('sidebar.inventory'), path: '/inventory', icon: <Package size={20} />, visible: !!isProducer },
        { text: t('sidebar.orders'), path: '/orders', icon: <ClipboardList size={20} />, visible: !!user },
        { text: t('sidebar.faq'), path: '/faq', icon: <HelpCircle size={20} />, visible: true }
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', bgcolor: 'var(--bg-surface)', color: 'var(--text-main)' }}>
            <Toolbar /> {/* Тільки для десктопа, щоб почати під навбаром */}
            <List sx={{ px: 1.5, mt: { xs: 2, md: 0 } }}>
                {menuItems.filter(item => item.visible).map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            onClick={() => { navigate(item.path); onClose(); }}
                            selected={location.pathname === item.path}
                            sx={{ borderRadius: '12px', mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {/* ДОДАТКОВІ КНОПКИ ДЛЯ ПЛАНШЕТІВ */}
                {isTablet && (
                    <>

                        <Divider sx={{ my: 2, opacity: 0.1 }} />
                        <Typography variant="caption" sx={{ px: 2, opacity: 0.5, textTransform: 'uppercase' }}>
                            {t('sidebar.settings')}
                        </Typography>

                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleProducerMode} sx={{ borderRadius: '12px' }}>
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Repeat size={20} /></ListItemIcon>
                                <ListItemText primary={t('nav.mode_toggle')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleLang} sx={{ borderRadius: '12px' }}>
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Languages size={20} /></ListItemIcon>
                                <ListItemText primary={t('nav.toggle_lang')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleTheme} sx={{ borderRadius: '12px' }}>
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </ListItemIcon>
                                <ListItemText primary={mode === 'dark' ? t('theme.light') : t('theme.dark')} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <Box component="nav">
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                PaperProps={{ sx: { width: 260, border: 'none' } }}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                PaperProps={{ sx: { width: 260, borderRight: '1px solid var(--border-color)' } }}
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;