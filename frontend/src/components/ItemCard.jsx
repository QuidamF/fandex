import "./ItemCard.css";

function ItemCard({ item, onCollect, onClick }) {
    return (
        <div
            className={`card ${item.collected ? "collected" : ""}`}
            onClick={onClick}
        >
            {item.image && (
                <img src={item.image} alt={item.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
            )}
            <h3>{item.name}</h3>
            <p className={`rarity ${item.rarity}`}>
                {item.rarity}
            </p>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onCollect(item.id);
                }}
            >
                {item.collected ? "Collected" : "Collect"}
            </button>
        </div>
    );
}

export default ItemCard;