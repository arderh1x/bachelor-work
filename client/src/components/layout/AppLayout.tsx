import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar onMenuClick={handleDrawerToggle} />

            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { md: 'var(--sidebar-width)' },
                    width: { md: `calc(100% - var(--sidebar-width))` },
                    minHeight: '100vh',
                    transition: 'margin var(--transition-std)',
                    bgcolor: 'var(--bg-light)',
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