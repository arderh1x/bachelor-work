import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useThemeMode } from '@/hooks/useThemeMode';
import '@/styles/layout.css';

function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { mode } = useThemeMode();

    // Фікс теми: додаємо клас на body, щоб працювали CSS змінні з ваших файлів
    useEffect(() => {
        document.body.className = mode;
    }, [mode]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}> {/* display: flex обов'язковий, щоб Drawer не перекривав контент */}
            <Navbar onMenuClick={handleDrawerToggle} />

            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    // На десктопі додаємо відступ, щоб контент не ховався за сайдбар
                    ml: { md: '260px' },
                    width: { md: `calc(100% - 260px)` },
                    minHeight: '100vh',
                    transition: 'margin 0.3s',
                    bgcolor: 'var(--bg-light)' // Використовуємо вашу змінну
                }}
            >
                <Toolbar /> {/* Відступ від Navbar */}
                <Box className="page-container fade-in">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default AppLayout;