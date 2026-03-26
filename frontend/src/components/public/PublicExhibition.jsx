import React from "react";
import CollectionFilters from "../shared/CollectionFilters";
import ItemGrid from "../shared/ItemGrid";

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
            <CollectionFilters 
                tags={tags} 
                rarities={rarities} 
                filterTag={filterTag} 
                filterRarity={filterRarity} 
                onTagChange={onFilterTagChange} 
                onRarityChange={onFilterRarityChange}
                className="public-filters"
            />

            <ItemGrid 
                items={filteredItems} 
                gridClassName="items-grid"
            />
        </div>
    );
}

export default PublicExhibition;
