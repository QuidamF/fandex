import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import ItemModal from "./ItemModal";

function ItemsView({ items, tags, onCollect }) {
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

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
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
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