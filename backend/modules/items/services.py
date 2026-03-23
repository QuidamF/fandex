from .repository import get_all_items


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