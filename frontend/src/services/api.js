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