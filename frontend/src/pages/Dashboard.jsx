import "./Dashboard.css";

import { useEffect, useState } from "react";
import { getItems, collectItem, getProgress, getAchievements, getTags } from "../services/api";

import HomeView from "../components/HomeView";
import ItemsView from "../components/ItemsView";
import AchievementsView from "../components/AchievementsView";

function Dashboard({ user }) {
    const [items, setItems] = useState([]);
    const [progress, setProgress] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [tags, setTags] = useState([]);
    const [view, setView] = useState("home");

    useEffect(() => {
        loadItems();
        loadExtras();
    }, []);

    const loadItems = async () => {
        const data = await getItems();

        const mapped = data.map(item => ({
            ...item,
            collected: false
        }));

        setItems(mapped);
    };

    const loadExtras = async () => {
        const p = await getProgress(user.id || 1);
        const a = await getAchievements(user.id || 1);
        const t = await getTags();

        setProgress(p);
        setAchievements(a);
        setTags(t.map(tag => tag.name));
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

        loadExtras();
    };

    let content;

    if (view === "home") {
        content = <HomeView progress={progress} />;
    } else if (view === "items") {
        content = <ItemsView items={items} tags={tags} onCollect={handleCollect} />;
    } else {
        content = <AchievementsView achievements={achievements} />;
    }

    return (
        <div>
            <h2>Welcome {user.username}</h2>
            {/* nav */}
            <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
                <button onClick={() => setView("home")}>Home</button>
                <button onClick={() => setView("items")}>Items</button>
                <button onClick={() => setView("achievements")}>Achievements</button>
            </div>

            {/* view content */}
            {content}
        </div>
    );
}

export default Dashboard;