import { createTheme, type PaletteMode } from '@mui/material';
import { amber, blueGrey } from '@mui/material/colors';

export const getAppTheme = (mode: PaletteMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: amber[600],
            contrastText: '#fff',
        },
        secondary: {
            main: blueGrey[900],
        },
        background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiIconButton: {
            defaultProps: {
                color: 'inherit',
            },
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        color: amber[600],
                        transform: 'rotate(15deg) scale(1.1)',
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: blueGrey[900],
                },
            },
        },
    },
});