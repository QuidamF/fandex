import "./ItemModal.css";

function ItemModal({ item, onClose, onCollect }) {
    if (!item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>✖</button>

                {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px", margin: "10px 0" }} />
                )}

                <h2>{item.name}</h2>
                <p><strong>Rarity:</strong> {item.rarity}</p>
                <p>{item.description || "No description"}</p>

                <button onClick={() => onCollect(item.id)}>
                    {item.collected ? "Collected" : "Collect"}
                </button>

            </div>
        </div>
    );
}

export default ItemModal;