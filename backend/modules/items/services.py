from .repository import get_all_items, insert_item, insert_item_tag, update_item_in_db, delete_item_from_db, clear_item_tags


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
            "rarity_color": item["rarity_color"],
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

def update_item_service(item_id, data):
    name = data.get("name")
    rarity = data.get("rarity")
    description = data.get("description", "")
    tags = data.get("tags", [])
    image = data.get("image", None)

    if not name:
        return {"status": False, "message": "Name required"}

    update_item_in_db(item_id, name, rarity, description, image)

    clear_item_tags(item_id)
    for tag in tags:
        insert_item_tag(item_id, tag)

    return {"status": True, "message": "Artifact Updated"}

def delete_item_service(item_id):
    delete_item_from_db(item_id)
    return {"status": True, "message": "Artifact Destroyed"}