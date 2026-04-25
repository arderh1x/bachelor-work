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

            <Box component="main" className="main-content">
                <Toolbar />
                <Box className="page-container fade-in">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default AppLayout;