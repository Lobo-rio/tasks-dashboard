import { useState } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import RichTextEditor from '../../components/RichTextEditor';

export default function SquadForm({ initial = {}, onClose, onSuccess }) {
    const [name, setName] = useState(initial.name || '');
    const [description, setDescription] = useState(initial.description || '');
    const [loading, setLoading] = useState(false);

    const save = async () => {
        if (!name) {
            toast.error('O nome da squad é obrigatório');
            return;
        }
        setLoading(true);
        try {
            if (initial.id) await api.squads.update(initial.id, { name, description });
            else await api.squads.create({ name, description });

            toast.success(initial.id ? 'Squad atualizada!' : 'Squad criada com sucesso!', {
                duration: 3000
            });

            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 3000);
        } catch (err) {
            toast.error('Erro ao salvar squad.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white p-6 rounded-lg shadow-xl w-[520px] relative z-10 animate-in fade-in zoom-in duration-200">
                <h4 className="text-xl font-bold mb-6 text-slate-800">
                    {initial.id ? 'Editar' : 'Nova'} Squad
                </h4>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Nome da Squad <span className="text-red-500">*</span></span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ex: Team Alpha"
                            disabled={loading}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Descrição</span>
                        <div className="mt-1">
                            <RichTextEditor
                                value={description}
                                onChange={setDescription}
                                placeholder="Descrição breve da squad..."
                                disabled={loading}
                            />
                        </div>
                    </label>
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
