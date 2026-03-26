import React from "react";
import ItemCard from "../ItemCard";

function PublicExhibition({ 
    filteredItems, 
    tags, 
    rarities, 
    filterTag, 
    filterRarity, 
    onFilterTagChange, 
    onFilterRarityChange 
}) {
    return (
        <div>
            {/* ITEMS BROWSER */}
            <div className="public-filters">
                <select 
                    className="public-select" 
                    value={filterTag} 
                    onChange={(e) => onFilterTagChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>

                <select 
                    className="public-select" 
                    value={filterRarity} 
                    onChange={(e) => onFilterRarityChange(e.target.value)}
                >
                    <option value="">All Rarities</option>
                    {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                </select>
            </div>

            <div className="items-grid">
                {filteredItems.map(item => (
                    <div key={item.id}>
                        <ItemCard item={item} />
                    </div>
                ))}
                {filteredItems.length === 0 && (
                    <p style={{ 
                        color: "#888", 
                        fontSize: "0.8rem", 
                        letterSpacing: "1px", 
                        gridColumn: "1/-1", 
                        textAlign: "center" 
                    }}>
                        NO ARTIFACTS FOUND
                    </p>
                )}
            </div>
        </div>
    );
}

export default PublicExhibition;
