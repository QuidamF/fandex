import ItemModal from "../shared/ItemModal";

function PublicExhibition({ 
    filteredItems, 
    tags, 
    rarities, 
    filterTag, 
    filterRarity, 
    onFilterTagChange, 
    onFilterRarityChange 
}) {
    const [selectedItem, setSelectedItem] = React.useState(null);

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
                onItemClick={setSelectedItem}
            />

            {selectedItem && (
                <ItemModal 
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}

export default PublicExhibition;
