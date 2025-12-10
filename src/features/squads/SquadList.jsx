import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import SquadForm from './SquadForm';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { Pencil, Trash2, Plus, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SquadList() {
    const [squads, setSquads] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const response = await api.squads.list({ search, page, limit });
            setSquads(response.data);
            setMeta(response.meta);
        } catch (error) {
            toast.error('Erro ao carregar squads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [search, page, limit]);

    const handleDelete = (squad) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-2">
                    <span className="font-medium text-slate-800">Excluir {squad.name}?</span>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 text-sm hover:bg-slate-50"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            onClick={async () => {
                                toast.dismiss(t.id);
                                await api.squads.delete(squad.id);
                                toast.success('Squad excluída');
                                load();
                            }}
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            ),
            { duration: Infinity }
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Squads</h1>
                <button
                    onClick={() => setEditing({})}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    Nova Squad
                </button>
            </div>

            <div className="mb-4">
                <SearchBar
                    value={search}
                    onChange={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                    placeholder="Buscar por nome ou descrição..."
                />
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Carregando...</div>
            ) : squads.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    {search ? 'Nenhuma squad encontrada' : 'Nenhuma squad cadastrada'}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {squads.map((s) => (
                            <div key={s.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{s.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditing(s)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                {s.description && (
                                    <div
                                        className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: s.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Pagination
                            currentPage={page}
                            totalPages={meta.totalPages}
                            totalItems={meta.total}
                            itemsPerPage={limit}
                            onPageChange={setPage}
                            onItemsPerPageChange={(newLimit) => {
                                setLimit(newLimit);
                                setPage(1);
                            }}
                        />
                    </div>
                </>
            )}

            {editing && (
                <SquadForm
                    initial={editing}
                    onClose={() => setEditing(null)}
                    onSuccess={load}
                />
            )}
        </div>
    );
}
