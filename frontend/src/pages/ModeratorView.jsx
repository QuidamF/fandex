import { useState, useEffect } from "react";
import { createItem, getTags, createTag } from "../services/api";

function ModeratorView({ user }) {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("common");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = () => {
        getTags().then(setTags);
    };

    const handleCreateItem = async () => {
        if (!tag) {
            alert("Select a tag");
            return;
        }

        const res = await createItem({
            name,
            rarity,
            tags: [tag],
            description
        });

        if (res.status) {
            alert("Item created!");
            setName("");
            setTag("");
            setDescription("");
        } else {
            alert(res.message);
        }
    };

    const handleCreateTag = async () => {
        if (!newTag) return;

        const res = await createTag(newTag);

        if (res.status) {
            setNewTag("");
            loadTags(); // 🔥 refresca lista
        } else {
            alert(res.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Moderator Panel</h2>

            {/* 🟣 CREATE TAG */}
            <h3>Create Tag</h3>

            <input
                placeholder="New tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
            />

            <button onClick={handleCreateTag}>Create Tag</button>

            <hr />

            {/* 🟡 CREATE ITEM */}
            <h3>Create Item</h3>

            <input
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <select onChange={(e) => setRarity(e.target.value)}>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="legendary">Legendary</option>
            </select>

            {/* 🔥 SOLO SELECT, sin input manual */}
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
                <option value="">Select tag</option>
                {tags.map(t => (
                    <option key={t.id} value={t.name}>
                        {t.name}
                    </option>
                ))}
            </select>

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleCreateItem}>Create Item</button>
        </div>
    );
}

export default ModeratorView;