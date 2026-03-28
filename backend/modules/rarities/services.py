from .repository import get_all_rarities, create_rarity, delete_rarity, get_total_rarity_count
from core.config import MAX_RARITIES

def list_rarities():
    rarities = get_all_rarities()
    return [dict(r) for r in rarities]

def add_rarity(data):
    if get_total_rarity_count() >= MAX_RARITIES:
        return {"status": False, "message": f"Limit reached for this demo ({MAX_RARITIES}). Preserve the collection by recycling existing rarities."}
    name = data.get("name")
    color_hex = data.get("color_hex")
    tier = int(data.get("tier", 0))
    
    if not name or not color_hex:
        return {"status": False, "message": "Missing tier metrics"}
        
    success = create_rarity(name.lower(), color_hex, tier)
    if success:
        return {"status": True, "message": "Rarity tier forged successfully."}
    return {"status": False, "message": "Failed or duplicate tier."}

def drop_rarity(r_id):
    delete_rarity(r_id)
    return {"status": True, "message": "Tier destroyed."}
