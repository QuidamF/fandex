from .repository import get_all_items, insert_item, insert_item_tag


def list_items():
    items = get_all_items()

    result = []

    for item in items:
        result.append({
            "id": item["id"],
            "name": item["name"],
            "description": item["description"],
            "image": item["image"],
            "rarity": item["rarity"],
            "tags": item["tags"].split(",") if item["tags"] else []
        })

    return result

def create_item(data):
    name = data.get("name")
    rarity = data.get("rarity")
    description = data.get("description", "")
    tags = data.get("tags", [])
    image = data.get("image", None)

    if not name:
        return {"status": False, "message": "Name required"}

    item_id = insert_item(name, rarity, description, image)

    for tag in tags:
        insert_item_tag(item_id, tag)

    return {"status": True, "message": "Item created"}