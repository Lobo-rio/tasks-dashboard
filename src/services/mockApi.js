// simples mock usando localStorage
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getStorage = (key, defaultValue = []) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
};

const setStorage = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

const uuid = () => Math.random().toString(36).slice(2, 9);

export const mockApi = {
    users: {
        list: async () => {
            await delay(200);
            return getStorage('users', []);
        },
        create: async (user) => {
            await delay(250);
            const users = getStorage('users', []);
            const item = { id: uuid(), ...user };
            users.push(item);
            setStorage('users', users);
            return item;
        },
        update: async (id, data) => {
            await delay(200);
            const users = getStorage('users', []);
            const idx = users.findIndex((u) => u.id === id);
            if (idx === -1) throw new Error('User not found');
            users[idx] = { ...users[idx], ...data };
            setStorage('users', users);
            return users[idx];
        },
        delete: async (id) => {
            await delay(150);
            let users = getStorage('users', []);
            users = users.filter((u) => u.id !== id);
            setStorage('users', users);
            return true;
        },
    },
    squads: {
        list: async () => {
            await delay(200);
            return getStorage('squads', []);
        },
        create: async (squad) => {
            await delay(200);
            const squads = getStorage('squads', []);
            const item = { id: uuid(), ...squad };
            squads.push(item);
            setStorage('squads', squads);
            return item;
        },
        update: async (id, data) => {
            await delay(200);
            const squads = getStorage('squads', []);
            const idx = squads.findIndex((s) => s.id === id);
            if (idx === -1) throw new Error('Squad not found');
            squads[idx] = { ...squads[idx], ...data };
            setStorage('squads', squads);
            return squads[idx];
        },
        delete: async (id) => {
            await delay(150);
            let squads = getStorage('squads', []);
            squads = squads.filter((s) => s.id !== id);
            setStorage('squads', squads);
            return true;
        },
    },
    tasks: {
        list: async () => {
            await delay(200);
            return getStorage('tasks', []);
        },
        create: async (task) => {
            await delay(200);
            const tasks = getStorage('tasks', []);
            const item = { id: uuid(), createdAt: new Date().toISOString(), ...task };
            tasks.push(item);
            setStorage('tasks', tasks);
            return item;
        },
        update: async (id, data) => {
            await delay(200);
            const tasks = getStorage('tasks', []);
            const idx = tasks.findIndex((t) => t.id === id);
            if (idx === -1) throw new Error('Task not found');
            tasks[idx] = { ...tasks[idx], ...data };
            setStorage('tasks', tasks);
            return tasks[idx];
        },
        delete: async (id) => {
            await delay(150);
            let tasks = getStorage('tasks', []);
            tasks = tasks.filter((t) => t.id !== id);
            setStorage('tasks', tasks);
            return true;
        },
    },
};
