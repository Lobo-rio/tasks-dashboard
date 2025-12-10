const API_BASE_URL = 'http://localhost:3000/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, config);

    if (response.status === 204) {
        return null; // No content for DELETE operations
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// Build query string from params
function buildQueryString(params) {
    const filtered = Object.entries(params || {})
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return filtered ? `?${filtered}` : '';
}

export const api = {
    users: {
        list: (params) => apiCall(`/users${buildQueryString(params)}`),
        get: (id) => apiCall(`/users/${id}`),
        create: (data) => apiCall('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id, data) => apiCall(`/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
        delete: (id) => apiCall(`/users/${id}`, {
            method: 'DELETE',
        }),
    },

    squads: {
        list: (params) => apiCall(`/squads${buildQueryString(params)}`),
        get: (id) => apiCall(`/squads/${id}`),
        create: (data) => apiCall('/squads', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id, data) => apiCall(`/squads/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
        delete: (id) => apiCall(`/squads/${id}`, {
            method: 'DELETE',
        }),
    },

    tasks: {
        list: (params) => apiCall(`/tasks${buildQueryString(params)}`),
        get: (id) => apiCall(`/tasks/${id}`),
        create: (data) => apiCall('/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id, data) => apiCall(`/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
        delete: (id) => apiCall(`/tasks/${id}`, {
            method: 'DELETE',
        }),
    },
};
