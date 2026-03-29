import React from "react";

/**
 * CollectionFilters component renders standardized select inputs for tags and rarities.
 */
function CollectionFilters({ 
    tags, 
    rarities, 
    filterTag, 
    filterRarity, 
    onTagChange, 
    onRarityChange,
    className = "shared-filters" 
}) {
    return (
        <div className={className} style={{ 
            display: "flex", 
            gap: "15px", 
            marginBottom: "30px", 
            flexWrap: "wrap",
            width: "100%" 
        }}>
            <select 
                className="vintage-select" 
                value={filterTag} 
                onChange={(e) => onTagChange(e.target.value)}
                style={{ flex: "1 1 180px", minWidth: 0 }}
            >
                <option value="">All Categories</option>
                {tags.map(t => (
                    <option key={t.id || t} value={t.name || t}>
                        {t.name || t}
                    </option>
                ))}
            </select>
 
            <select 
                className="vintage-select" 
                value={filterRarity} 
                onChange={(e) => onRarityChange(e.target.value)}
                style={{ flex: "1 1 180px", minWidth: 0 }}
            >
                <option value="">All Rarities</option>
                {rarities.map(r => (
                    <option key={r.id || r.name} value={r.name}>
                        {r.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CollectionFilters;
