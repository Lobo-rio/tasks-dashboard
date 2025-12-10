import { useState } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function UserForm({ initial = {}, onClose, onSuccess }) {
    const [name, setName] = useState(initial.name || '');
    const [email, setEmail] = useState(initial.email || '');
    const [loading, setLoading] = useState(false);

    const save = async () => {
        if (!name || !email) {
            toast.error('Preencha os campos obrigatórios');
            return;
        }
        setLoading(true);
        try {
            if (initial.id) await api.users.update(initial.id, { name, email });
            else await api.users.create({ name, email });

            toast.success(initial.id ? 'Usuário atualizado!' : 'Usuário criado com sucesso!', {
                duration: 3000
            });

            // Wait 3 seconds before closing
            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 3000);

        } catch (err) {
            toast.error('Erro ao salvar usuário.');
            setLoading(false); // Re-enable if error, but if success we keep it disabled until close
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white p-6 rounded-lg shadow-xl w-[520px] relative z-10 animate-in fade-in zoom-in duration-200">
                <h4 className="text-xl font-bold mb-6 text-slate-800">
                    {initial.id ? 'Editar' : 'Novo'} Usuário
                </h4>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Nome <span className="text-red-500">*</span></span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ex: João Silva"
                            disabled={loading}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ex: joao@email.com"
                            disabled={loading}
                            required
                        />
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
