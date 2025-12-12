import React, { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function TaskFilters({
    onFilterChange,
    users = {},
    squads = {},
    initialFilters = {},
}) {
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
        userId: "",
        squadId: "",
        ...initialFilters,
    });

    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedSearch !== filters.search) {
                setFilters((prev) => ({ ...prev, search: debouncedSearch }));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [debouncedSearch]);

    // Notify parent of changes
    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const handleChange = (key, value) => {
        if (key === "search") {
            setDebouncedSearch(value);
        } else {
            setFilters((prev) => ({ ...prev, [key]: value }));
        }
    };

    const clearFilters = () => {
        const empty = {
            search: "",
            status: "",
            priority: "",
            userId: "",
            squadId: "",
        };
        setDebouncedSearch("");
        setFilters(empty);
    };

    const hasActiveFilters =
        filters.status ||
        filters.priority ||
        filters.userId ||
        filters.squadId ||
        debouncedSearch;

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                />
                <input
                    type="text"
                    value={debouncedSearch}
                    onChange={(e) => handleChange("search", e.target.value)}
                    placeholder="Buscar tarefas por título ou descrição..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
            </div>

            <div className="flex flex-wrap gap-3 items-end">
                {/* Status Filter */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                        Status
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">Todos</option>
                        <option value="todo">A Fazer</option>
                        <option value="doing">Em Progresso</option>
                        <option value="done">Concluído</option>
                    </select>
                </div>

                {/* Priority Filter */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                        Prioridade
                    </label>
                    <select
                        value={filters.priority}
                        onChange={(e) => handleChange("priority", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">Todas</option>
                        <option value="high">Alta</option>
                        <option value="medium">Média</option>
                        <option value="low">Baixa</option>
                    </select>
                </div>

                {/* User Filter */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                        Responsável
                    </label>
                    <select
                        value={filters.userId}
                        onChange={(e) => handleChange("userId", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">Todos</option>
                        {Object.entries(users).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Squad Filter */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                        Squad
                    </label>
                    <select
                        value={filters.squadId}
                        onChange={(e) => handleChange("squadId", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">Todos</option>
                        {Object.entries(squads).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 h-[42px]"
                    >
                        <X size={16} />
                        Limpar
                    </button>
                )}
            </div>
        </div>
    );
}
