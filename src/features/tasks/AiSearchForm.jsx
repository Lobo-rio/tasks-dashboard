import { useState } from "react";
import { api } from "../../services/api";
import { Search, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function AiSearchForm({ onClose, onOpenTask, isPage = false }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const data = await api.ai.search(query);
            setResult(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro na busca inteligente.");
        } finally {
            setLoading(false);
        }
    };

    const containerClass = isPage
        ? "w-full h-full flex flex-col"
        : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm";

    const contentClass = isPage
        ? "w-full flex flex-col h-full"
        : "bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200";

    const headerClass = isPage
        ? "hidden"
        : "p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800";

    return (
        <div className={containerClass}>
            <div className={contentClass}>
                <div className={headerClass}>
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-indigo-600 dark:text-indigo-400" size={24} />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            Busca Inteligente (IA)
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto flex flex-col">
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ex: 'Quais tarefas estão atrasadas?' ou 'Tarefas sobre bugs de login'"
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-sm text-lg outline-none transition-all"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                            <Sparkles size={12} />
                            A IA analisará o contexto de todas as tarefas para encontrar as mais relevantes.
                        </p>
                    </form>

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            {result.summary && (
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg">
                                    <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-1">Resumo da IA</h4>
                                    <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                                        {result.summary}
                                    </p>
                                </div>
                            )}

                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                                    Resultados Encontrados
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{result.tasks?.length || 0}</span>
                                </h3>

                                {result.tasks && result.tasks.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.tasks.map(task => (
                                            <div key={task.id} className="relative group">
                                                {/* Minimal Card View for Search Results */}
                                                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-all cursor-pointer"
                                                    onClick={() => onOpenTask && onOpenTask(task)}
                                                >
                                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{task.title}</h4>
                                                    <p className="text-xs text-slate-500 line-clamp-2">{task.description?.replace(/<[^>]+>/g, '')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        Nenhuma tarefa encontrada para este contexto.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
