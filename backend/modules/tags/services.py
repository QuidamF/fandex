from .repository import insert_tag, get_tags, update_tag_in_db, delete_tag_from_db

def create_tag(data):
    name = data.get("name")
    if not name:
        return {"status": False, "message": "Identifier required"}

    success = insert_tag(name)
    if not success:
        return {"status": False, "message": "Tag already registered"}

    return {"status": True, "message": "Tag Cataloged"}


def list_tags():
    tags = get_tags()
    return [{"id": t["id"], "name": t["name"]} for t in tags]

def update_tag_service(tag_id, data):
    name = data.get("name")
    if not name: return {"status": False, "message": "Identifier required"}
    update_tag_in_db(tag_id, name)
    return {"status": True, "message": "Category Updated"}

def delete_tag_service(tag_id):
    delete_tag_from_db(tag_id)
    return {"status": True, "message": "Category Deleted"}