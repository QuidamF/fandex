import { useState, useMemo } from "react";

/**
 * useItemFiltering hook manages the state and logic for filtering a list of items.
 */
export function useItemFiltering(initialItems = []) {
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    const filteredItems = useMemo(() => {
        return initialItems.filter(item => {
            const matchesTag = filterTag ? item.tags?.includes(filterTag) : true;
            const matchesRarity = filterRarity ? item.rarity === filterRarity : true;
            return matchesTag && matchesRarity;
        });
    }, [initialItems, filterTag, filterRarity]);

    const resetFilters = () => {
        setFilterTag("");
        setFilterRarity("");
    };

    return {
        filterTag,
        setFilterTag,
        filterRarity,
        setFilterRarity,
        filteredItems,
        resetFilters
    };
}
