from .repository import get_all_items, insert_item, insert_item_tag, update_item_in_db, delete_item_from_db, clear_item_tags
from core.image_utils import process_item_image


def list_items():
    items = get_all_items()

    result = []

    for item in items:
        result.append({
            "id": item["id"],
            "name": item["name"],
            "description": item["description"],
            "has_image": bool(item["image"]) or bool(item["image_filename"]),
            "image_url": f"/api/items/{item['id']}/image",
            "thumb_url": f"/api/items/{item['id']}/thumb" if item["thumb_filename"] else f"/api/items/{item['id']}/image",
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

    image_filename = None
    thumb_filename = None

    if image and image.startswith("data:image"):
        proc = process_item_image(image, name)
        if proc["success"]:
            image_filename = proc["main_filename"]
            thumb_filename = proc["thumb_filename"]
            # We clear the Base64 from the DB to save space if processed successfully
            image = "" 

    item_id = insert_item(name, rarity, description, image, image_filename, thumb_filename)

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

    image_filename = None
    thumb_filename = None

    if image and image.startswith("data:image"):
        proc = process_item_image(image, name)
        if proc["success"]:
            image_filename = proc["main_filename"]
            thumb_filename = proc["thumb_filename"]
            # Migrate to file system: clear the Base64 field
            image = ""
            update_item_in_db(item_id, name, rarity, description, image, image_filename, thumb_filename)
        else:
            update_item_in_db(item_id, name, rarity, description, image, None, None)
    else:
        # If no new image provided, we just update text fields
        # But we need to keep existing filenames if they exist?
        # The update_item_in_db currently takes None for filenames in the 'else' branch of services
        # Let's check how update_item_in_db is implemented.
        update_item_in_db(item_id, name, rarity, description, None, None, None)

    clear_item_tags(item_id)
    for tag in tags:
        insert_item_tag(item_id, tag)

    return {"status": True, "message": "Artifact Updated"}

def delete_item_service(item_id):
    delete_item_from_db(item_id)
    return {"status": True, "message": "Artifact Destroyed"}