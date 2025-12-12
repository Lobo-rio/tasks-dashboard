import { useEffect, useState } from "react";
import { api } from "../../services/api";
import TaskForm from "./TaskForm";
import Pagination from "../../components/Pagination";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [squads, setSquads] = useState({});
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Adjusted for pagination requirements
  const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Filters state managed nicely here
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    userId: "",
    squadId: "",
  });

  const loadLookups = async () => {
    try {
      const [u, s] = await Promise.all([
        api.users.list({ limit: 1000 }),
        api.squads.list({ limit: 1000 }),
      ]);
      setUsers(
        u.data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {})
      );
      setSquads(
        s.data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {})
      );
    } catch (error) {
      console.error("Failed to load lookups", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...filters,
      };

      // Clean empty params
      Object.keys(params).forEach(
        (key) => (params[key] === "" || params[key] == null) && delete params[key]
      );

      console.log("Fetching tasks with params:", params);

      const response = await api.tasks.list(params);
      setTasks(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLookups();
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      load();
    }
  }, [page, limit, filters, initialLoading]);

  // Handle filter changes from child component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 on filter change
  };

  const handleDelete = (task) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span className="font-medium text-slate-800">
            Excluir {task.title}?
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 text-sm hover:bg-slate-50 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.tasks.delete(task.id);
                  toast.success("Tarefa excluída");
                  load();
                } catch (e) {
                  toast.error("Erro ao excluir tarefa");
                }
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tarefas
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Gerencie suas atividades e acompanhe o progresso do time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing({})}
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 transition-all font-medium gap-2 shadow-sm hover:shadow-md"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nova Tarefa</span>
            <span className="sm:hidden">Nova</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <TaskFilters
          users={users}
          squads={squads}
          onFilterChange={handleFilterChange}
        />

        {loading && tasks.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-3">
                <Plus className="text-slate-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhuma tarefa encontrada</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                Não encontramos tarefas com os filtros selecionados ou nenhuma tarefa foi criada ainda.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  userName={users[t.userId]}
                  squadName={squads[t.squadId]}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
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
      </div>

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
