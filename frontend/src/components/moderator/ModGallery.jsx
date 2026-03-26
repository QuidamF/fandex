import React from "react";
import ItemCard from "../ItemCard";

function ModGallery({ 
    stats, 
    tags, 
    rarities, 
    filterRarity, 
    setFilterRarity, 
    filterTag, 
    setFilterTag, 
    filteredItems, 
    handleEditItemClick 
}) {
    return (
        <div className="mod-catalogue" style={{ marginTop: 0 }}>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                LIVE SYSTEM DATABASE
                <span style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>*CLICK ARTIFACTS TO ENTER EDIT MODE</span>
            </h3>
            
            {stats && (
                <div className="mod-stats-banner">
                    <div>Active Collectors <span>{stats.fans}</span></div>
                    <div>Total Artifacts <span>{stats.items}</span></div>
                    <div>Active Categories <span>{tags.length}</span></div>
                </div>
            )}

            <div style={{ display: "flex", gap: "30px", marginBottom: "40px", paddingBottom: "25px", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
                <select className="mod-select" style={{ margin: 0 }} value={filterRarity} onChange={e => setFilterRarity(e.target.value)}>
                    <option value="">All Rarities</option>
                    {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                </select>
                <select className="mod-select" style={{ margin: 0 }} value={filterTag} onChange={e => setFilterTag(e.target.value)}>
                    <option value="">All Categories</option>
                    {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
            </div>

            <div className="mod-grid">
                {filteredItems.map(i => (
                    <div 
                        key={i.id} 
                        onClick={() => handleEditItemClick(i)} 
                        style={{ cursor: "pointer", transition: "transform 0.2s" }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <ItemCard item={i} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ModGallery;
