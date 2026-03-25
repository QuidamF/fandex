import "./ItemModal.css";

function ItemModal({ item, onClose, onCollect }) {
    if (!item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${item.collected ? "collected" : ""}`} style={{ "--rarity-color": item.rarity_color || "#9ca3af" }} onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-bg"></div>

                <div className="modal-inner-content">
                    <button className="close-btn" onClick={onClose}>✖</button>

                    {item.image && (
                        <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "4px", padding: "10px", margin: "10px 0" }}>
                            <img src={item.image} alt={item.name} style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "2px" }} />
                        </div>
                    )}

                    <h2>{item.name}</h2>
                    <p><strong style={{ color: item.rarity_color || "#9ca3af"}}>Rarity:</strong> {item.rarity.toUpperCase()}</p>
                    <p>{item.description || "No description"}</p>

                    <button onClick={() => onCollect(item.id)}>
                        {item.collected ? "Collected" : "Collect"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ItemModal;