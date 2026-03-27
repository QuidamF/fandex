import { useState, useEffect, useRef } from "react";
import { 
    createItem, getTags, createTag, getItems, getStats, 
    updateItem, deleteItem, deleteTag, getCollectionInfo, 
    updateCollectionInfo, getAllAchievements, createAchievement, 
    deleteAchievement, getRarities, createRarity, deleteRarity 
} from "../services/api";

// Modular Components
import ModStudio from "../components/moderator/ModStudio";
import ModCategories from "../components/moderator/ModCategories";
import ModRarities from "../components/moderator/ModRarities";
import ModGallery from "../components/moderator/ModGallery";
import ModIdentity from "../components/moderator/ModIdentity";
import ModTrophies from "../components/moderator/ModTrophies";

import "./ModeratorView.css";

function ModeratorView({ user, onLogout }) {
    const [view, setView] = useState("minting");

    // form state
    const [editItemId, setEditItemId] = useState(null);
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("common");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const fileInputRef = useRef(null);

    const [newTag, setNewTag] = useState("");

    const [tags, setTags] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState(null);
    const [achievements, setAchievements] = useState([]);
    
    // gallery filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    // identity
    const [collectionName, setCollectionName] = useState("");
    const [collectionDesc, setCollectionDesc] = useState("");
    
    // new rarities
    const [newRarityName, setNewRarityName] = useState("");
    const [newRarityColor, setNewRarityColor] = useState("#c084fc");
    const [newRarityTier, setNewRarityTier] = useState("");

    // achievements
    const [achName, setAchName] = useState("");
    const [achDesc, setAchDesc] = useState("");
    const [achType, setAchType] = useState("total_items");
    const [achValue, setAchValue] = useState("");
    const [achExtra, setAchExtra] = useState("");

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (view === "minting") {
            getTags().then(res => {
                setTags(res);
                if (res.length > 0 && !tag) setTag(res[0].name);
            });
            getRarities().then(res => {
                setRarities(res);
                if (res.length > 0 && rarity === "common") setRarity(res[0].name);
            });
        } else if (view === "gallery") {
            getItems().then(setItems);
            getStats().then(setStats);
            getTags().then(setTags);
            getRarities().then(setRarities);
        } else if (view === "identity") {
            getCollectionInfo().then(res => {
                if (res) {
                    setCollectionName(res.name);
                    setCollectionDesc(res.description);
                }
            });
            getRarities().then(setRarities);
        } else if (view === "trophies") {
            getAllAchievements().then(setAchievements);
            getTags().then(setTags);
            getRarities().then(setRarities);
        }
    }, [view]);

    // Item CRUD
    const handleSaveItem = async () => {
        if (!tag) {
            alert("Select a tag");
            return;
        }
        const payload = { name, rarity, tags: [tag], description, image };
        const res = editItemId ? await updateItem(editItemId, payload) : await createItem(payload);

        if (res.status) {
            handleClearForm();
            alert(res.message);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteItem = async () => {
        if (!editItemId) return;
        if (!window.confirm("Are you sure you want to completely destroy this artifact?")) return;
        const res = await deleteItem(editItemId);
        if (res.status) {
            handleClearForm();
        } else {
            alert(res.message);
        }
    };

    const handleEditItemClick = (item) => {
        setEditItemId(item.id);
        setName(item.name);
        setRarity(item.rarity);
        setDescription(item.description || "");
        setImage(item.has_image ? `http://localhost:5000/api/items/${item.id}/image` : "");
        setTag(item.tags.length > 0 ? item.tags[0] : "");
        setView("minting");
    };

    const handleClearForm = () => {
        if (editItemId) setView("gallery");
        
        setEditItemId(null);
        setName("");
        setRarity(rarities.length > 0 ? rarities[0].name : "common");
        setDescription("");
        setImage("");
        setTag(tags.length > 0 ? tags[0].name : "");
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Tag CRUD
    const handleCreateTag = async () => {
        if (!newTag) return;
        const res = await createTag(newTag);
        if (res.status) {
            setNewTag("");
            getTags().then(setTags);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteTag = async (tag_id) => {
        if (!window.confirm("Are you sure you want to delete this category? All artifacts using it will lose this tag.")) return;
        const res = await deleteTag(tag_id);
        if (res.status) {
            getTags().then(setTags);
        }
    };

    const handleSaveCollectionInfo = async () => {
        if (!collectionName) return;
        const res = await updateCollectionInfo(collectionName, collectionDesc);
        alert(res.message);
    };

    const handleCreateRarity = async () => {
        if (!newRarityName || !newRarityTier) {
            alert("Rarity must have a Name and a Tier value (number)");
            return;
        }
        const res = await createRarity(newRarityName, newRarityColor, newRarityTier);
        if (res.status) {
            setNewRarityName("");
            setNewRarityTier("");
            getRarities().then(setRarities);
        } else {
            alert(res.message);
        }
    };
    
    const handleDeleteRarity = async (r_id) => {
        if (!window.confirm("Destroy this rarity? Items tied to it will become standard.")) return;
        await deleteRarity(r_id);
        getRarities().then(setRarities);
    };

    const handleCreateTrophy = async () => {
        if (!achName || !achValue) return;
        const payload = {
            name: achName,
            description: achDesc,
            condition_type: achType,
            condition_value: parseInt(achValue),
            condition_extra: achExtra
        };
        const res = await createAchievement(payload);
        if (res.status) {
            setAchName(""); setAchDesc(""); setAchValue(""); setAchExtra("");
            getAllAchievements().then(setAchievements);
        } else { alert(res.message); }
    };

    const handleDeleteTrophy = async (id) => {
        if (!window.confirm("Destroy this trophy entirely?")) return;
        const res = await deleteAchievement(id);
        if (res.status) getAllAchievements().then(setAchievements);
    };

    const filteredItems = items.filter(item => {
        const matchesTag = filterTag ? item.tags.includes(filterTag) : true;
        const matchesRarity = filterRarity ? item.rarity === filterRarity : true;
        return matchesTag && matchesRarity;
    });

    const renderContent = () => {
        switch (view) {
            case "minting":
                return (
                    <>
                        <ModStudio 
                            editItemId={editItemId}
                            name={name} setName={setName}
                            rarity={rarity} setRarity={setRarity}
                            tag={tag} setTag={setTag}
                            description={description} setDescription={setDescription}
                            image={image} handleFile={handleFile}
                            fileInputRef={fileInputRef}
                            handleSaveItem={handleSaveItem}
                            handleClearForm={handleClearForm}
                            handleDeleteItem={handleDeleteItem}
                            tags={tags}
                            rarities={rarities}
                        />
                        <ModCategories 
                            newTag={newTag} setNewTag={setNewTag}
                            handleCreateTag={handleCreateTag}
                            tags={tags}
                            handleDeleteTag={handleDeleteTag}
                        />
                        <ModRarities 
                            newRarityName={newRarityName} setNewRarityName={setNewRarityName}
                            newRarityTier={newRarityTier} setNewRarityTier={setNewRarityTier}
                            newRarityColor={newRarityColor} setNewRarityColor={setNewRarityColor}
                            handleCreateRarity={handleCreateRarity}
                            rarities={rarities}
                            handleDeleteRarity={handleDeleteRarity}
                        />
                    </>
                );
            case "gallery":
                return (
                    <ModGallery 
                        stats={stats}
                        tags={tags}
                        rarities={rarities}
                        filterRarity={filterRarity} setFilterRarity={setFilterRarity}
                        filterTag={filterTag} setFilterTag={setFilterTag}
                        filteredItems={filteredItems}
                        handleEditItemClick={handleEditItemClick}
                    />
                );
            case "identity":
                return (
                    <ModIdentity 
                        collectionName={collectionName} setCollectionName={setCollectionName}
                        collectionDesc={collectionDesc} setCollectionDesc={setCollectionDesc}
                        handleSaveCollectionInfo={handleSaveCollectionInfo}
                    />
                );
            case "trophies":
                return (
                    <ModTrophies 
                        achName={achName} setAchName={setAchName}
                        achDesc={achDesc} setAchDesc={setAchDesc}
                        achType={achType} setAchType={setAchType}
                        setAchExtra={setAchExtra}
                        achValue={achValue} setAchValue={setAchValue}
                        achExtra={achExtra}
                        rarities={rarities}
                        tags={tags}
                        handleCreateTrophy={handleCreateTrophy}
                        achievements={achievements}
                        handleDeleteTrophy={handleDeleteTrophy}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="mod-wrapper">
            <header className="mod-header">
                <h2 className="mod-title">
                    CURATOR'S DESK <span>/// MODERATOR ACCESS</span>
                </h2>
                
                <nav className="mod-nav">
                    <button className={`mod-tab vintage-tab ${view === "minting" ? "active" : ""}`} onClick={() => setView("minting")}>Studio</button>
                    <button className={`mod-tab vintage-tab ${view === "gallery" ? "active" : ""}`} onClick={() => setView("gallery")}>Gallery</button>
                    <button className={`mod-tab vintage-tab ${view === "identity" ? "active" : ""}`} onClick={() => setView("identity")}>Identity</button>
                    <button className={`mod-tab vintage-tab ${view === "trophies" ? "active" : ""}`} onClick={() => setView("trophies")}>Milestones</button>
                    <button 
                        className="mod-tab vintage-tab logout" 
                        onClick={onLogout}
                        style={{ color: "#ef4444", borderBottom: "1px solid rgba(239,68,68,0.3)" }}
                    >Disconnect</button>
                </nav>
            </header>

            <main className="mod-content" style={view !== "minting" ? { display: "block" } : {}}>
                {renderContent()}
            </main>
        </div>
    );
}

export default ModeratorView;