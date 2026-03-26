import React from "react";
import ItemCard from "./ItemCard";

/**
 * ItemGrid component renders a grid of ItemCards with a standardized layout and empty state.
 */
function ItemGrid({ 
    items, 
    onItemClick, 
    onCollect, 
    emptyMessage = "NO ARTIFACTS FOUND",
    gridClassName = "shared-grid" 
}) {
    if (!items || items.length === 0) {
        return (
            <p style={{ 
                color: "#888", 
                fontSize: "0.85rem", 
                letterSpacing: "2px", 
                textAlign: "center", 
                padding: "100px 0",
                width: "100%",
                border: "1px dashed rgba(255,255,255,0.05)"
            }}>
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className={gridClassName} style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
            gap: "30px" 
        }}>
            {items.map(item => (
                <div 
                    key={item.id} 
                    onClick={() => onItemClick && onItemClick(item)}
                    style={onItemClick ? { cursor: "pointer" } : {}}
                >
                    <ItemCard item={item} onCollect={onCollect} />
                </div>
            ))}
        </div>
    );
}

export default ItemGrid;
