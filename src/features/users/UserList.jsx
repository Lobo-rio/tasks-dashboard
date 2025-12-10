import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import UserForm from './UserForm';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { Pencil, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const response = await api.users.list({ search, page, limit });
            setUsers(response.data);
            setMeta(response.meta);
        } catch (error) {
            toast.error('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [search, page, limit]);

    const handleDelete = (user) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-2">
                    <span className="font-medium text-slate-800">Excluir {user.name}?</span>
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
                                await api.users.delete(user.id);
                                toast.success('Usuário excluído');
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
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Usuários</h1>
                <button
                    onClick={() => setEditing({})}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    Novo Usuário
                </button>
            </div>

            <div className="mb-4">
                <SearchBar
                    value={search}
                    onChange={(value) => {
                        setSearch(value);
                        setPage(1); // Reset to first page on search
                    }}
                    placeholder="Buscar por nome ou email..."
                />
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Carregando...</div>
            ) : users.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    {search ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                </div>
            ) : (
                <>
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-200">Nome</th>
                                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-200">Email</th>
                                    <th className="text-right p-4 font-semibold text-slate-700 dark:text-slate-200">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                        <td className="p-4 text-slate-800 dark:text-slate-200">{u.name}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">{u.email}</td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setEditing(u)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mr-3 transition"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u)}
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

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
                </>
            )}

            {editing && (
                <UserForm
                    initial={editing}
                    onClose={() => setEditing(null)}
                    onSuccess={load}
                />
            )}
        </div>
    );
}
