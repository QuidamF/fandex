import "./ItemCard.css";

function ItemCard({ item, onCollect, onClick }) {
    return (
        <div
            className={`card ${item.collected ? "collected" : ""}`}
            onClick={onClick}
        >
            <div className="card-bg"></div>

            <div className="card-content">
                {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "2px" }} />
                )}
                <h3>{item.name}</h3>
                <p className={`rarity ${item.rarity}`}>
                    {item.rarity}
                </p>

                {onCollect && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCollect(item.id);
                        }}
                    >
                        {item.collected ? "Collected" : "Collect"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemCard;