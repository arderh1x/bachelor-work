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
        <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            <Toolbar />

            <List className="sidebar-list" sx={{ mt: { xs: 2, md: 0 } }}>
                {menuItems.filter(item => item.visible).map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton onClick={() => { navigate(item.path); onClose(); }} disableRipple={false}
                                className={`sidebar-item-btn ${isActive ? 'sidebar-active-item' : ''}`}>
                                <ListItemIcon className="sidebar-item-icon">
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText primary={item.text} className="sidebar-item-text" />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

                {isTablet && (
                    <>
                        <Divider className="divider-std" />
                        <Typography variant="caption" className="sidebar-section-title">
                            {t('sidebar.settings')}
                        </Typography>

                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleProducerMode} className="sidebar-item-btn">
                                <ListItemIcon className="sidebar-item-icon"><Repeat size={20} /></ListItemIcon>

                                <ListItemText primary={t('nav.mode_toggle')} className="sidebar-item-text" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleLang} className="sidebar-item-btn">
                                <ListItemIcon className="sidebar-item-icon"><Languages size={20} /></ListItemIcon>

                                <ListItemText primary={t('nav.toggle_lang')} className="sidebar-item-text" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleTheme} className="sidebar-item-btn">
                                <ListItemIcon className="sidebar-item-icon">
                                    {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </ListItemIcon>

                                <ListItemText primary={mode === 'dark' ? t('theme.light') : t('theme.dark')}
                                    className="sidebar-item-text" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <Box component="nav">
            {/* Мобильный временный Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }} // Лучше для производительности на мобильном
                classes={{ paper: 'sidebar-paper' }}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {drawerContent}
            </Drawer>

            {/* Десктопный постоянный Drawer */}
            <Drawer
                variant="permanent"
                classes={{ paper: 'sidebar-paper' }}
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;