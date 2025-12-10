import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const { theme, palette, toggleTheme, changePalette, palettes, currentColors } = useTheme();

    const handlePaletteChange = (newPalette) => {
        changePalette(newPalette);
        toast.success(`Paleta alterada para ${newPalette}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Configurações</h1>

            {/* Theme Toggle */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    Tema
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Escolha entre o modo claro ou escuro
                </p>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2"
                    style={{
                        backgroundColor: currentColors.primary,
                        color: 'white'
                    }}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    Alternar para modo {theme === 'dark' ? 'claro' : 'escuro'}
                </button>
            </div>

            {/* Color Palette */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Palette size={20} />
                    Paleta de Cores
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Personalize as cores dos gráficos e botões
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {palettes.map((paletteName) => (
                        <button
                            key={paletteName}
                            onClick={() => handlePaletteChange(paletteName)}
                            className={`p-4 rounded-lg border-2 transition ${palette === paletteName
                                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <div className="font-medium text-slate-800 dark:text-slate-100 mb-2 capitalize">
                                {paletteName}
                            </div>
                            <div className="flex gap-2">
                                {Object.values(
                                    paletteName === 'default'
                                        ? { primary: '#6366f1', secondary: '#8b5cf6', success: '#10b981' }
                                        : paletteName === 'ocean'
                                            ? { primary: '#0ea5e9', secondary: '#06b6d4', success: '#14b8a6' }
                                            : paletteName === 'forest'
                                                ? { primary: '#22c55e', secondary: '#84cc16', success: '#10b981' }
                                                : paletteName === 'sunset'
                                                    ? { primary: '#f97316', secondary: '#f59e0b', success: '#10b981' }
                                                    : { primary: '#a855f7', secondary: '#d946ef', success: '#10b981' }
                                ).map((color, idx) => (
                                    <div
                                        key={idx}
                                        className="w-8 h-8 rounded"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
