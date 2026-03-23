from .repository import add_user_item, get_user_items


def collect_item(data):
    user_id = data.get("user_id")
    item_id = data.get("item_id")

    if not user_id or not item_id:
        return {"status": False, "message": "Missing data"}

    success = add_user_item(user_id, item_id)

    if not success:
        return {"status": False, "message": "Item already collected"}

    return {"status": True, "message": "Item collected"}


def list_user_collection(user_id):
    items = get_user_items(user_id)

    result = []

    for item in items:
        result.append({
            "id": item["id"],
            "name": item["name"],
            "rarity": item["rarity"]
        })

    return result