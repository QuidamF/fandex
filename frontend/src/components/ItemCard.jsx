import "./ItemCard.css";

function ItemCard({ item, onCollect }) {
    return (
        <div className={`card ${item.collected ? "collected" : ""}`}>
            <h3>{item.name}</h3>
            <p className={`rarity ${item.rarity}`}>
                {item.rarity}
            </p>

            <button onClick={() => onCollect(item.id)}>
                {item.collected ? "Collected" : "Collect"}
            </button>
        </div>
    );
}

export default ItemCard;