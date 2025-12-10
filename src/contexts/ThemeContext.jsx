import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const defaultPalette = {
    primary: '#6366f1', // indigo
    secondary: '#8b5cf6', // violet
    success: '#10b981', // green
    warning: '#f59e0b', // amber
    danger: '#ef4444', // red
};

const palettes = {
    default: defaultPalette,
    ocean: {
        primary: '#0ea5e9', // sky
        secondary: '#06b6d4', // cyan
        success: '#14b8a6', // teal
        warning: '#f59e0b', // amber
        danger: '#ef4444', // red
    },
    forest: {
        primary: '#22c55e', // green
        secondary: '#84cc16', // lime
        success: '#10b981', // emerald
        warning: '#f59e0b', // amber
        danger: '#ef4444', // red
    },
    sunset: {
        primary: '#f97316', // orange
        secondary: '#f59e0b', // amber
        success: '#10b981', // green
        warning: '#eab308', // yellow
        danger: '#dc2626', // red
    },
    purple: {
        primary: '#a855f7', // purple
        secondary: '#d946ef', // fuchsia
        success: '#10b981', // green
        warning: '#f59e0b', // amber
        danger: '#ef4444', // red
    },
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const [palette, setPalette] = useState(() => {
        return localStorage.getItem('palette') || 'default';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('palette', palette);
        const colors = palettes[palette];
        Object.entries(colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--color-${key}`, value);
        });
    }, [palette]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const changePalette = (newPalette) => {
        if (palettes[newPalette]) {
            setPalette(newPalette);
        }
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            palette,
            toggleTheme,
            changePalette,
            palettes: Object.keys(palettes),
            currentColors: palettes[palette]
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
