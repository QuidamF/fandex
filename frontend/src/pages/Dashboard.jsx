import "./Dashboard.css";

import { useEffect, useState } from "react";
import { getItems, collectItem } from "../services/api";
import ItemCard from "../components/ItemCard";

import { getProgress, getAchievements } from "../services/api";
import ProgressBar from "../components/ProgressBar";
import AchievementList from "../components/AchievementList";

function Dashboard({ user }) {
    const [items, setItems] = useState([]);
    const [progress, setProgress] = useState(null);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        loadItems();
        loadExtras();
    }, []);

    const loadItems = async () => {
        const data = await getItems();

        // Inicialmente ninguno está colectado
        const mapped = data.map(item => ({
            ...item,
            collected: false
        }));

        setItems(mapped);
    };

    const loadExtras = async () => {
        const p = await getProgress(user.id || 1);
        const a = await getAchievements(user.id || 1);

        setProgress(p);
        setAchievements(a);
    };

    const handleCollect = async (itemId) => {
        await collectItem(user.id || 1, itemId);

        setItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, collected: true }
                    : item
            )
        );

        loadExtras(); // 🔥 recalcula progreso + logros
    };

    return (
        <div>
            <h2>Welcome {user.username}</h2>

            {progress && <ProgressBar progress={progress} />}

            {achievements.length > 0 && (
                <AchievementList achievements={achievements} />
            )}

            <div className="grid">
                {items.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onCollect={handleCollect}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;