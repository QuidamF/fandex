import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import ItemModal from "./ItemModal";
import { getRarities } from "../services/api";

function ItemsView({ items, tags, onCollect }) {
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rarities, setRarities] = useState([]);

    useEffect(() => {
        getRarities().then(setRarities).catch(() => {});
    }, []);

    // Keep selected item in sync if its collected status changes
    useEffect(() => {
        if (selectedItem) {
            const updated = items.find(i => i.id === selectedItem.id);
            if (updated) setSelectedItem(updated);
        }
    }, [items, selectedItem]);

    const filteredItems = items.filter(item => {
        const matchTag = filterTag ? item.tags?.includes(filterTag) : true;
        const matchRarity = filterRarity ? item.rarity === filterRarity : true;

        return matchTag && matchRarity;
    });

    return (
        <div>
            <div className="vintage-filters">
                <select className="vintage-select" onChange={(e) => setFilterTag(e.target.value)}>
                    <option value="">All Tags</option>
                    {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                <select className="vintage-select" onChange={(e) => setFilterRarity(e.target.value)}>
                    <option value="">All Rarities</option>
                    {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                </select>
            </div>

            <div className="grid">
                {filteredItems.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onCollect={onCollect}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </div>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onCollect={onCollect}
                />
            )}
        </div>
    );
}

export default ItemsView;