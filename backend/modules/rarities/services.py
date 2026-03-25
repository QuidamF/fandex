from .repository import get_all_rarities, create_rarity, delete_rarity

def list_rarities():
    return get_all_rarities()

def add_rarity(data):
    name = data.get("name")
    color_hex = data.get("color_hex")
    
    if not name or not color_hex:
        return {"status": False, "message": "Missing name or color"}
        
    success = create_rarity(name.lower(), color_hex)
    if success:
        return {"status": True, "message": "Rarity tier forged successfully."}
    return {"status": False, "message": "Failed or duplicate tier."}

def drop_rarity(r_id):
    delete_rarity(r_id)
    return {"status": True, "message": "Tier destroyed."}
