import { useEffect, useState } from "react";
import { getStats, createModerator } from "../services/api";

function AdminView({ user, onLogout }) {
    const [stats, setStats] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getStats().then(setStats);
    }, []);

    const handleCreateModerator = async () => {
        if (!username || !password) {
            alert("Fill all fields");
            return;
        }

        const res = await createModerator(username, password);

        if (res.status) {
            alert("Moderator created!");
            setUsername("");
            setPassword("");

            // 🔥 refrescar stats
            getStats().then(setStats);
        } else {
            alert(res.message);
        }
    };

    if (!stats) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Admin Dashboard</h2>
                <button onClick={onLogout} style={{ padding: "8px 16px", cursor: "pointer", background: "#ef4444", color: "white", border: "none", borderRadius: "5px" }}>Logout</button>
            </div>

            {/* 📊 STATS */}
            <div>
                <p>Fans: {stats.fans}</p>
                <p>Moderators: {stats.moderators}</p>
                <p>Items: {stats.items}</p>
            </div>

            <hr />

            {/* 🟡 CREATE MODERATOR */}
            <h3>Create Moderator</h3>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleCreateModerator}>
                Create Moderator
            </button>
        </div>
    );
}

export default AdminView;