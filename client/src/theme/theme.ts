import { createTheme, type PaletteMode, type Theme } from '@mui/material';
import { amber, blueGrey } from '@mui/material/colors';

// ─── MUI тема ───

export const getAppTheme = (mode: PaletteMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: amber[600],          // #ffb300
            contrastText: '#fff',
        },
        secondary: {
            main: blueGrey[900],       // #263238
        },
        background: {
            default: mode === 'light' ? '#f8f9fa' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
        },
        text: {
            primary: mode === 'light' ? '#2c3e50' : '#f1f5f9',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
            disabled: mode === 'light' ? '#94a3b8' : '#64748b',
        },
        divider: mode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)',
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiIconButton: {
            defaultProps: { color: 'inherit' },
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
                    backgroundImage: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

// ─── CSS-змінні, що генеруються з MUI-теми ────

export const applyCssVars = (theme: Theme, mode: PaletteMode): void => {
    const root = document.documentElement;
    const p = theme.palette;

    const set = (name: string, value: string) =>
        root.style.setProperty(name, value);

    // Поверхні
    set('--bg-light', p.background.default);
    set('--bg-surface', p.background.paper);

    // Текст
    set('--text-main', p.text.primary);
    set('--text-secondary', p.text.secondary);
    set('--text-muted', p.text.disabled);

    // Декор
    set('--border-color', p.divider);
    set('--shadow-sm', mode === 'light'
        ? '0 2px 8px rgba(0,0,0,0.05)'
        : '0 2px 8px rgba(0,0,0,0.3)');
    set('--shadow-md', mode === 'light'
        ? '0 12px 24px rgba(0,0,0,0.08)'
        : '0 12px 24px rgba(0,0,0,0.4)');
    set('--shadow-lg', mode === 'light'
        ? '0 24px 48px rgba(0,0,0,0.12)'
        : '0 24px 48px rgba(0,0,0,0.6)');

    // Навбар — фони
    set('--nav-bg-producer', mode === 'light' ? '#0d0d0d' : '#050505');
    set('--nav-text-producer', '#9e9e9e');
    set('--nav-bg-customer', mode === 'light' ? '#ffffff' : '#1a1a1a');
    set('--nav-border-customer', mode === 'light' ? '#eeeeee' : '#2a2a2a');
    set('--nav-text-customer', p.text.primary);

    // Логотип — градієнт 
    set('--nav-logo-gradient', 'linear-gradient(90deg, #ff8f00, #e53935)');

    // Кнопки перемикання режиму
    set('--nav-btn-producer-bg', '#ffb300');
    set('--nav-btn-producer-text', '#0d0d0d');
    set('--nav-btn-customer-border', '#ffb300');
    set('--nav-btn-customer-text', mode === 'light' ? '#e65100' : '#ffb300');
};