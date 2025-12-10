import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, CheckSquare, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        usersCount: 0,
        squadsCount: 0,
        tasksCount: 0,
        tasksByStatus: [],
        tasksByPriority: []
    });

    useEffect(() => {
        const loadStats = async () => {
            const [users, squads, tasks] = await Promise.all([
                api.users.list(),
                api.squads.list(),
                api.tasks.list()
            ]);

            const statusCounts = tasks.reduce((acc, curr) => {
                acc[curr.status || 'todo'] = (acc[curr.status || 'todo'] || 0) + 1;
                return acc;
            }, {});

            const priorityCounts = tasks.reduce((acc, curr) => {
                acc[curr.priority || 'medium'] = (acc[curr.priority || 'medium'] || 0) + 1;
                return acc;
            }, {});

            setStats({
                usersCount: users.length,
                squadsCount: squads.length,
                tasksCount: tasks.length,
                tasksByStatus: [
                    { name: 'A Fazer', value: statusCounts['todo'] || 0, color: '#94a3b8' },
                    { name: 'Em Progresso', value: statusCounts['doing'] || 0, color: '#f59e0b' },
                    { name: 'Concluído', value: statusCounts['done'] || 0, color: '#10b981' }
                ],
                tasksByPriority: [
                    { name: 'Baixa', value: priorityCounts['low'] || 0, color: '#10b981' },
                    { name: 'Média', value: priorityCounts['medium'] || 0, color: '#f59e0b' },
                    { name: 'Alta', value: priorityCounts['high'] || 0, color: '#ef4444' }
                ]
            });
        };

        loadStats();
        // Set up an interval to refresh stats periodically if needed, or just on mount.
        // For standard React app, mount is enough unless we have realtime requirements.
    }, []);

    const StatCard = ({ title, count, icon: Icon, color, link, linkText }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-slate-500 mb-1">{title}</h3>
                    <p className={`text-4xl font-bold ${color}`}>{count}</p>
                </div>
                <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                    <Icon className={color} size={24} />
                </div>
            </div>
            <Link to={link} className="mt-4 text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                {linkText} <Plus size={14} />
            </Link>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Usuários"
                    count={stats.usersCount}
                    icon={Users}
                    color="text-indigo-600"
                    link="/users"
                    linkText="Gerenciar usuários"
                />
                <StatCard
                    title="Total Squads"
                    count={stats.squadsCount}
                    icon={Briefcase}
                    color="text-blue-600"
                    link="/squads"
                    linkText="Gerenciar squads"
                />
                <StatCard
                    title="Tarefas Totais"
                    count={stats.tasksCount}
                    icon={CheckSquare}
                    color="text-purple-600"
                    link="/tasks"
                    linkText="Gerenciar tarefas"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Tarefas por Status</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={stats.tasksByStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {stats.tasksByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Tarefas por Prioridade</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart
                            data={stats.tasksByPriority}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                                {stats.tasksByPriority.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
