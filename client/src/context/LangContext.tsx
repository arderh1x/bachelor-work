import { createContext, useState, useEffect, type ReactNode } from 'react';
import ua from '../locales/ua';
import en from '../locales/en';

export type Language = 'ua' | 'en';

type Translations = typeof ua;

interface LangContextType {
    lang: Language;
    t: (path: string) => string;
    toggleLang: () => void;
}

const translations: Record<Language, Translations> = { ua, en };

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>(
        (localStorage.getItem('appLang') as Language) || 'ua'
    );

    const toggleLang = () => {
        setLang((prev) => (prev === 'ua' ? 'en' : 'ua'));
    };

    useEffect(() => {
        localStorage.setItem('appLang', lang);
    }, [lang]);

    const t = (path: string): string => {
        const keys = path.split('.');
        let result: Record<string, unknown> | unknown = translations[lang];

        for (const key of keys) {
            if (result && typeof result === 'object' && key in (result as Record<string, unknown>)) {
                result = (result as Record<string, unknown>)[key];
            } else {
                console.warn(`Translation path not found: ${path}`);
                return path;
            }
        }

        return typeof result === 'string' ? result : path;
    };

    return (
        <LangContext.Provider value={{ lang, t, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
}

export default LangContext;