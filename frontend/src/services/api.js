const API_URL = "http://localhost:5000/api";

export async function login(username, password) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}

export async function getItems() {
    const res = await fetch(`${API_URL}/items`);
    return res.json();
}

export async function getUserCollection(user_id) {
    const res = await fetch(`${API_URL}/collection/${user_id}`);
    return res.json();
}

export async function getRanking() {
    const res = await fetch(`${API_URL}/ranking`);
    return res.json();
}

export async function collectItem(user_id, item_id) {
    const res = await fetch(`${API_URL}/collection/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id, item_id })
    });

    return res.json();
}

export async function getProgress(user_id) {
    const res = await fetch(`${API_URL}/collection/progress/${user_id}`);
    return res.json();
}

export async function getAchievements(user_id) {
    const res = await fetch(`${API_URL}/achievements/${user_id}`);
    return res.json();
}

export async function register(username, password) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}

export async function createItem(data) {
    const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function getTags() {
    const res = await fetch(`${API_URL}/tags`);
    return res.json();
}

export async function createTag(name) {
    const res = await fetch(`${API_URL}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    return res.json();
}

export async function getStats() {
    const res = await fetch(`${API_URL}/admin/stats`);
    return res.json();
}

export async function createModerator(username, password) {
    const res = await fetch(`${API_URL}/users/create-moderator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}

export async function updateItem(id, data) {
    const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteItem(id) {
    const res = await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
    return res.json();
}

export async function updateTag(id, data) {
    const res = await fetch(`${API_URL}/tags/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteTag(id) {
    const res = await fetch(`${API_URL}/tags/${id}`, { method: "DELETE" });
    return res.json();
}

export async function getCollectionInfo() {
    const res = await fetch(`${API_URL}/collection/info`);
    return res.json();
}

export async function updateCollectionInfo(name, description) {
    const res = await fetch(`${API_URL}/collection/info`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description })
    });
    return res.json();
}

export async function purgeSystem() {
    const res = await fetch(`${API_URL}/admin/purge`, { method: "DELETE" });
    return res.json();
}
