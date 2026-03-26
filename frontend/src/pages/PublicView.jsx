import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, getTags, getRanking, getCollectionInfo, getRarities, getAllAchievements } from "../services/api";

// Modular Components
import PublicHero from "../components/public/PublicHero";
import PublicStats from "../components/public/PublicStats";
import PublicNav from "../components/public/PublicNav";
import PublicOverview from "../components/public/PublicOverview";
import PublicExhibition from "../components/public/PublicExhibition";
import PublicMilestones from "../components/public/PublicMilestones";

import "./PublicView.css";

function PublicView() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [view, setView] = useState("overview");
    const [collectionInfo, setCollectionInfo] = useState({ name: "MUSEUM", description: "Connecting to global archive..." });
    
    // filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    useEffect(() => {
        getItems().then(setItems).catch(console.error);
        getTags().then(setTags).catch(console.error);
        getRarities().then(setRarities).catch(console.error);
        getAllAchievements().then(setAchievements).catch(console.error);
        getRanking()
            .then(data => setRanking(data || []))
            .catch(console.error);
        getCollectionInfo()
            .then(res => {
                if (res.status) setCollectionInfo(res.data);
            })
            .catch(console.error);
    }, []);

    const filteredItems = items.filter(item => {
        const matchTag = filterTag ? item.tags?.includes(filterTag) : true;
        const matchRarity = filterRarity ? item.rarity === filterRarity : true;
        return matchTag && matchRarity;
    });

    const tagDistribution = tags.map(tag => {
        const count = items.filter(i => (i.tags || []).includes(tag.name)).length;
        return { name: tag.name, count };
    });

    const renderContent = () => {
        switch (view) {
            case "overview":
                return <PublicOverview ranking={ranking} tagDistribution={tagDistribution} />;
            case "collection":
                return (
                    <PublicExhibition 
                        filteredItems={filteredItems}
                        tags={tags}
                        rarities={rarities}
                        filterTag={filterTag}
                        filterRarity={filterRarity}
                        onFilterTagChange={setFilterTag}
                        onFilterRarityChange={setFilterRarity}
                    />
                );
            case "achievements":
                return <PublicMilestones achievements={achievements} />;
            default:
                return null;
        }
    };

    return (
        <div className="public-wrapper">
            <PublicHero 
                collectionInfo={collectionInfo} 
                onEnter={() => navigate('/login')} 
            />

            <PublicStats 
                itemsCount={items.length} 
                tagsCount={tags.length} 
                achievementsCount={achievements.length} 
            />

            <PublicNav 
                currentView={view} 
                onViewChange={setView} 
            />

            <main className="public-content">
                {renderContent()}
            </main>
        </div>
    );
}

export default PublicView;
