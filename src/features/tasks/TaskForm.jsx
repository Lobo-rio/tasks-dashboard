import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import RichTextEditor from '../../components/RichTextEditor';

export default function TaskForm({ initial = {}, onClose, onSuccess }) {
    const [title, setTitle] = useState(initial.title || '');
    const [description, setDescription] = useState(initial.description || '');
    const [status, setStatus] = useState(initial.status || 'todo');
    const [priority, setPriority] = useState(initial.priority || 'medium');
    const [userId, setUserId] = useState(initial.userId || '');
    const [squadId, setSquadId] = useState(initial.squadId || '');
    const [dueDate, setDueDate] = useState(initial.dueDate || '');

    const [users, setUsers] = useState([]);
    const [squads, setSquads] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Promise.all([api.users.list(), api.squads.list()])
            .then(([u, s]) => {
                setUsers(u);
                setSquads(s);
            });
    }, []);

    const save = async () => {
        if (!title) {
            toast.error('O título da tarefa é obrigatório');
            return;
        }
        setLoading(true);
        try {
            const data = { title, description, status, priority, userId, squadId, dueDate };
            if (initial.id) await api.tasks.update(initial.id, data);
            else await api.tasks.create(data);

            toast.success(initial.id ? 'Tarefa atualizada!' : 'Tarefa criada com sucesso!', {
                duration: 3000
            });

            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 3000);
        } catch (err) {
            toast.error('Erro ao salvar tarefa.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 animate-in fade-in zoom-in duration-200">
                <h4 className="text-xl font-bold mb-6 text-slate-800">
                    {initial.id ? 'Editar' : 'Nova'} Tarefa
                </h4>
                <div className="grid grid-cols-1 gap-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Título <span className="text-red-500">*</span></span>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Título da tarefa"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Descrição</span>
                        <div className="mt-1">
                            <RichTextEditor
                                value={description}
                                onChange={setDescription}
                                placeholder="Detalhes..."
                                disabled={loading}
                            />
                        </div>
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Responsável</span>
                            <select
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Selecione...</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Squad</span>
                            <select
                                value={squadId}
                                onChange={(e) => setSquadId(e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Selecione...</option>
                                {squads.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Status</span>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="todo">A Fazer</option>
                                <option value="doing">Em Progresso</option>
                                <option value="done">Concluído</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Prioridade</span>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Prazo</span>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={save}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
