from .repository import get_all_items, insert_item, insert_item_tag, update_item_in_db, delete_item_from_db, clear_item_tags, get_item_by_id, get_total_item_count
from core.image_utils import process_item_image
from core.config import MAX_ITEMS


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

def get_item_media(item_id, kind="image"):
    item = get_item_by_id(item_id)
    if not item:
        return None
        
    if kind == "thumb" and item["thumb_filename"]:
        return {"type": "file", "filename": item["thumb_filename"], "subdir": "thumbs"}
        
    if item["image_filename"]:
        return {"type": "file", "filename": item["image_filename"]}
        
    if item["image"]:
        return {"type": "base64", "data": item["image"]}
        
    return None

def create_item(data):
    if get_total_item_count() >= MAX_ITEMS:
        return {"status": False, "message": f"Maximum artifact capacity reached ({MAX_ITEMS}). Please remove some to continue."}
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
            image = "" 

    item_id = insert_item(name, rarity, description, image, image_filename, thumb_filename)

    for tag in tags:
        insert_item_tag(item_id, tag)

    return {"status": True, "message": "Artifact Cataloged"}

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
            image = ""
            update_item_in_db(item_id, name, rarity, description, image, image_filename, thumb_filename)
        else:
            update_item_in_db(item_id, name, rarity, description, image, None, None)
    else:
        update_item_in_db(item_id, name, rarity, description, None, None, None)

    clear_item_tags(item_id)
    for tag in tags:
        insert_item_tag(item_id, tag)

    return {"status": True, "message": "Artifact Updated"}

def delete_item_service(item_id):
    delete_item_from_db(item_id)
    return {"status": True, "message": "Artifact Destroyed"}