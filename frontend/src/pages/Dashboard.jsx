import "./Dashboard.css";

import { useEffect, useState } from "react";
import { getItems, collectItem } from "../services/api";
import ItemCard from "../components/ItemCard";

function Dashboard({ user }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
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

    const handleCollect = async (itemId) => {
        await collectItem(user.id || 1, itemId);

        setItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, collected: true }
                    : item
            )
        );
    };

    return (
        <div>
            <h2>Welcome {user.username}</h2>

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