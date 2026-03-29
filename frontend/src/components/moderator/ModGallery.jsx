import ItemModal from "../shared/ItemModal";

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
    const [selectedItem, setSelectedItem] = React.useState(null);

    const bannerStats = stats ? {
        "Active Collectors": stats.fans,
        "Total Artifacts": stats.items,
        "Active Categories": tags.length
    } : null;

    return (
        <div className="mod-catalogue" style={{ marginTop: 0 }}>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                LIVE SYSTEM DATABASE
                <span style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>*CLICK ARTIFACTS FOR FULL PROJECTION</span>
            </h3>
            
            <StatBanner stats={bannerStats} className="mod-stats-banner" />

            <CollectionFilters 
                tags={tags} 
                rarities={rarities} 
                filterTag={filterTag} 
                filterRarity={filterRarity} 
                onTagChange={setFilterTag} 
                onRarityChange={setFilterRarity}
                className="shared-filters"
            />

            <ItemGrid 
                items={filteredItems} 
                onItemClick={setSelectedItem}
                gridClassName="mod-grid"
            />

            {selectedItem && (
                <ItemModal 
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onEdit={handleEditItemClick}
                />
            )}
        </div>
    );
}

export default ModGallery;
