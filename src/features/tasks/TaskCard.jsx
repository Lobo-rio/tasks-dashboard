import React from "react";
import {
    Calendar,
    User,
    Users,
    CheckCircle2,
    Clock,
    Circle,
    Pencil,
    Trash2,
    AlertCircle,
} from "lucide-react";

// Helper for priority styles
const getPriorityStyles = (priority) => {
    switch (priority) {
        case "high":
            return {
                bg: "bg-red-50 dark:bg-red-900/20",
                text: "text-red-700 dark:text-red-400",
                border: "border-red-200 dark:border-red-800/50",
                icon: <AlertCircle size={14} className="mr-1" />,
                label: "Alta",
            };
        case "medium":
            return {
                bg: "bg-amber-50 dark:bg-amber-900/20",
                text: "text-amber-700 dark:text-amber-400",
                border: "border-amber-200 dark:border-amber-800/50",
                icon: <Circle size={14} className="mr-1 fill-current" />,
                label: "Média",
            };
        case "low":
        default:
            return {
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                text: "text-emerald-700 dark:text-emerald-400",
                border: "border-emerald-200 dark:border-emerald-800/50",
                icon: <Circle size={14} className="mr-1" />,
                label: "Baixa",
            };
    }
};

// Helper for status icons
const getStatusIcon = (status) => {
    switch (status) {
        case "done":
            return <CheckCircle2 className="text-emerald-500" size={20} />;
        case "doing":
            return <Clock className="text-amber-500" size={20} />;
        default:
            return <Circle className="text-slate-400" size={20} />;
    }
};

export default function TaskCard({
    task,
    userName,
    squadName,
    onEdit,
    onDelete,
}) {
    const priorityStyle = getPriorityStyles(task.priority);

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-200 flex flex-col h-full animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <div className="mt-0.5" title={`Status: ${task.status}`}>
                        {getStatusIcon(task.status)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 leading-tight mb-1 line-clamp-2">
                            {task.title}
                        </h3>
                        <div
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border}`}
                        >
                            {priorityStyle.icon}
                            {priorityStyle.label}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                {task.description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                        {task.description.replace(/<[^>]+>/g, '')}
                    </p>
                )}
            </div>

            <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-700/50 flex flex-col gap-2">
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-500">
                    {userName && (
                        <div className="flex items-center gap-1.5" title="Responsável">
                            <User size={14} />
                            <span className="truncate max-w-[120px]">{userName}</span>
                        </div>
                    )}
                    {squadName && (
                        <div className="flex items-center gap-1.5" title="Squad">
                            <Users size={14} />
                            <span className="truncate max-w-[120px]">{squadName}</span>
                        </div>
                    )}
                    {task.dueDate && (
                        <div className="flex items-center gap-1.5" title="Data de entrega">
                            <Calendar size={14} />
                            <span>{new Date(task.dueDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                        title="Editar"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Excluir"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
