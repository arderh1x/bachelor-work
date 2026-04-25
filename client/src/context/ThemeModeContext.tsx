import React, { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, type PaletteMode } from '@mui/material';
import { getAppTheme, applyCssVars } from '../theme/theme';

interface ThemeContextType {
    mode: PaletteMode;
    toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>(
        (localStorage.getItem('themeMode') as PaletteMode) || 'light'
    );

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    useEffect(() => {
        localStorage.setItem('themeMode', mode);

        document.body.classList.toggle('dark', mode === 'dark');
        applyCssVars(theme, mode);
    }, [mode, theme]);

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};

export default ThemeModeContext;