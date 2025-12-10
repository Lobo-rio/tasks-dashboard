import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
    const [localValue, setLocalValue] = useState(value || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [localValue, onChange]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100"
            />
            {localValue && (
                <button
                    onClick={() => setLocalValue('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
