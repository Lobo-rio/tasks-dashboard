import { Outlet, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Layout() {
    return (
        <div className="h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <aside className="w-64 p-4 border-r bg-white dark:bg-slate-800 shadow-sm flex flex-col border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-8 text-indigo-600 px-2">Antigravyti</h2>
                <nav className="flex flex-col gap-2">
                    <Link to="/" className="p-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition flex items-center gap-2">
                        Dashboard
                    </Link>
                    <Link to="/users" className="p-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition flex items-center gap-2">
                        Usuários
                    </Link>
                    <Link to="/squads" className="p-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition flex items-center gap-2">
                        Squads
                    </Link>
                    <Link to="/tasks" className="p-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition flex items-center gap-2">
                        Tarefas
                    </Link>
                </nav>

                {/* Settings and Exit at bottom */}
                <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                    <nav className="flex flex-col gap-2">
                        <Link to="/settings" className="p-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-300 transition flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Configurações
                        </Link>
                        <button
                            onClick={() => {
                                toast(
                                    (t) => (
                                        <div className="flex flex-col gap-2">
                                            <span className="font-medium text-slate-800">Deseja realmente sair da aplicação?</span>
                                            <div className="flex gap-2">
                                                <button
                                                    className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 text-sm hover:bg-slate-50"
                                                    onClick={() => toast.dismiss(t.id)}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                                    onClick={() => {
                                                        toast.dismiss(t.id);
                                                        window.electronAPI?.quit();
                                                    }}
                                                >
                                                    Sair
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                    { duration: Infinity }
                                );
                            }}
                            className="p-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-red-600 dark:text-red-400 transition flex items-center gap-2 text-left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sair
                        </button>
                    </nav>
                </div>

                <div className="text-xs text-slate-400 px-2 pt-2">
                    v0.1.0 Beta
                </div>
            </aside>
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
