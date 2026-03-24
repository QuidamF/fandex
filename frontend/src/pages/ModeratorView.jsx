import { useState, useEffect } from "react";
import { createItem, getItems } from "../services/api";

function ModeratorView({ user }) {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("common");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        getItems().then(data => {
            const allTags = [...new Set(data.flatMap(i => i.tags || []))];
            setTags(allTags);
        });
    }, []);

    const handleCreate = async () => {
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

    return (
        <div style={{ padding: "20px" }}>
            <h2>Moderator Panel</h2>

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

            <input
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />

            <select onChange={(e) => setTag(e.target.value)}>
                <option value="">Select existing tag</option>
                {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleCreate}>Create Item</button>
        </div>
    );
}

export default ModeratorView;