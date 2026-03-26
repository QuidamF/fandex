import React, { useState, useEffect } from "react";
import ItemModal from "../shared/ItemModal";
import CollectionFilters from "../shared/CollectionFilters";
import ItemGrid from "../shared/ItemGrid";
import { getRarities } from "../../services/api";
import { useItemFiltering } from "../../hooks/useItemFiltering";

function DashGallery({ items, tags, onCollect }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [rarities, setRarities] = useState([]);

    const {
        filterTag, setFilterTag,
        filterRarity, setFilterRarity,
        filteredItems
    } = useItemFiltering(items);

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

    return (
        <div>
            <CollectionFilters 
                tags={tags} 
                rarities={rarities} 
                filterTag={filterTag} 
                filterRarity={filterRarity} 
                onTagChange={setFilterTag} 
                onRarityChange={setFilterRarity}
                className="vintage-filters"
            />

            <ItemGrid 
                items={filteredItems} 
                onItemClick={setSelectedItem}
                onCollect={onCollect}
                gridClassName="grid"
            />

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

export default DashGallery;
