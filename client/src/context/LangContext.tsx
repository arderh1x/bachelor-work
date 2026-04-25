import { createContext, useState, useEffect, type ReactNode } from 'react';
import ua from '../locales/ua';
import en from '../locales/en';

export type Language = 'ua' | 'en';
type Translations = typeof ua;

interface TranslationOptions {
    returnObjects?: boolean;
}

interface LangContextType {
    lang: Language;
    t: <T = string>(path: string, options?: TranslationOptions) => T;
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

    const t = <T = string>(path: string, options?: TranslationOptions): T => {
        const keys = path.split('.');
        let result: unknown = translations[lang];

        for (const key of keys) {
            const current = result as Record<string, unknown>;
            if (current && typeof current === 'object' && key in current) {
                result = current[key];
            } else {
                console.warn(`Translation path not found: ${path}`);
                return path as unknown as T;
            }
        }

        if (options?.returnObjects) return result as T;


        return (typeof result === 'string' ? result : path) as unknown as T;
    };

    return (
        <LangContext.Provider value={{ lang, t, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
};

export default LangContext;