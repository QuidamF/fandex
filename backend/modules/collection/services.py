from .repository import add_user_item, get_user_items, get_total_items, get_user_collected_count, get_collection_info, update_collection_info

def collect_item(data):
    from modules.achievements.services import evaluate_achievements

    user_id = data.get("user_id")
    item_id = data.get("item_id")

    if not user_id or not item_id:
        return {"status": False, "message": "Missing data"}

    success = add_user_item(user_id, item_id)

    if not success:
        return {"status": False, "message": "Item already collected"}

    unlocked_list = evaluate_achievements(user_id)

    return {"status": True, "message": "Item collected", "unlocked": unlocked_list}


def list_user_collection(user_id):
    items = get_user_items(user_id)

    result = []

    for item in items:
        result.append({
            "id": item["id"],
            "name": item["name"],
            "rarity": item["rarity"],
            "rarity_color": item["rarity_color"]
        })

    return result

def get_progress(user_id):
    total = get_total_items()
    collected = get_user_collected_count(user_id)

    if total == 0:
        percentage = 0
    else:
        percentage = int((collected / total) * 100)

    return {
        "collected": collected,
        "total": total,
        "percentage": percentage
    }

def fetch_collection_info():
    info = get_collection_info()
    return {"status": True, "data": info}

def modify_collection_info(data):
    name = data.get("name")
    desc = data.get("description", "")
    if not name: return {"status": False, "message": "Name required"}
    update_collection_info(name, desc)
    return {"status": True, "message": "Collection metadata updated"}