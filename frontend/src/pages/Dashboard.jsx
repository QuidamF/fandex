import "./Dashboard.css";

import { useEffect, useState } from "react";
import { getItems, collectItem } from "../services/api";
import ItemCard from "../components/ItemCard";

import { getProgress, getAchievements } from "../services/api";
import ProgressBar from "../components/ProgressBar";
import AchievementList from "../components/AchievementList";
import ItemModal from "../components/ItemModal";


function Dashboard({ user }) {
    const [items, setItems] = useState([]);
    const [progress, setProgress] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    const tags = [...new Set(items.flatMap(i => i.tags || []))];

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

        // Update selectedItem if it is the one being collected from the modal
        if (selectedItem && selectedItem.id === itemId) {
            setSelectedItem(prev => ({ ...prev, collected: true }));
        }

        loadExtras();
    };

    const filteredItems = items.filter(item => {
        const matchTag = filterTag ? item.tags?.includes(filterTag) : true;
        const matchRarity = filterRarity ? item.rarity === filterRarity : true;

        return matchTag && matchRarity;
    });

    return (
        <div>
            <h2>Welcome {user.username}</h2>

            {progress && <ProgressBar progress={progress} />}

            {achievements.length > 0 && (
                <AchievementList achievements={achievements} />
            )}

            <div style={{ padding: "10px" }}>

                <select onChange={(e) => setFilterTag(e.target.value)}>
                    <option value="">All Tags</option>
                    {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                <select onChange={(e) => setFilterRarity(e.target.value)}>
                    <option value="">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="legendary">Legendary</option>
                </select>

            </div>

            <div className="grid">
                {filteredItems.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onCollect={handleCollect}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </div>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onCollect={handleCollect}
                />
            )}
        </div>
    );
}

export default Dashboard;