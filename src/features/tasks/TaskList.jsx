import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import TaskForm from './TaskForm';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { Pencil, Trash2, Plus, Calendar, User, Users, CheckCircle2, Circle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState({});
    const [squads, setSquads] = useState({});
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);

    const loadLookups = async () => {
        const [u, s] = await Promise.all([
            api.users.list({ limit: 1000 }), // Get all for lookups
            api.squads.list({ limit: 1000 })
        ]);
        setUsers(u.data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}));
        setSquads(s.data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}));
    };

    const load = async () => {
        setLoading(true);
        try {
            const response = await api.tasks.list({ search, page, limit });
            setTasks(response.data);
            setMeta(response.meta);
        } catch (error) {
            toast.error('Erro ao carregar tarefas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLookups();
    }, []);

    useEffect(() => {
        load();
    }, [search, page, limit]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'done': return <CheckCircle2 className="text-green-500" size={20} />;
            case 'doing': return <Clock className="text-orange-500" size={20} />;
            default: return <Circle className="text-slate-400" size={20} />;
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'low': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
        }
    };

    const handleDelete = (task) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-2">
                    <span className="font-medium text-slate-800">Excluir {task.title}?</span>
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
                                await api.tasks.delete(task.id);
                                toast.success('Tarefa excluída');
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
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Tarefas</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gerencie e acompanhe as atividades</p>
                </div>
                <button
                    onClick={() => setEditing({})}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    Nova Tarefa
                </button>
            </div>

            <div className="mb-4">
                <SearchBar
                    value={search}
                    onChange={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                    placeholder="Buscar por título ou descrição..."
                />
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Carregando...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    {search ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa cadastrada'}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {tasks.map((t) => (
                            <div key={t.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        {getStatusIcon(t.status)}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{t.title}</h3>
                                            {t.description && (
                                                <div
                                                    className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2"
                                                    dangerouslySetInnerHTML={{ __html: t.description }}
                                                />
                                            )}
                                            <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                {t.userId && (
                                                    <div className="flex items-center gap-1">
                                                        <User size={16} />
                                                        <span>{users[t.userId] || 'N/A'}</span>
                                                    </div>
                                                )}
                                                {t.squadId && (
                                                    <div className="flex items-center gap-1">
                                                        <Users size={16} />
                                                        <span>{squads[t.squadId] || 'N/A'}</span>
                                                    </div>
                                                )}
                                                {t.dueDate && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={16} />
                                                        <span>{new Date(t.dueDate).toLocaleDateString('pt-BR')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(t.priority)}`}>
                                            {t.priority === 'high' ? 'Alta' : t.priority === 'medium' ? 'Média' : 'Baixa'}
                                        </span>
                                        <button
                                            onClick={() => setEditing(t)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
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
                <TaskForm
                    initial={editing}
                    onClose={() => setEditing(null)}
                    onSuccess={load}
                />
            )}
        </div>
    );
}
