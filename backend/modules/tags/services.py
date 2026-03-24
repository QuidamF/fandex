from .repository import insert_tag, get_tags

def create_tag(data):
    name = data.get("name")

    if not name:
        return {"status": False, "message": "Name required"}

    success = insert_tag(name)

    if not success:
        return {"status": False, "message": "Tag already exists"}

    return {"status": True, "message": "Tag created"}


def list_tags():
    tags = get_tags()

    return [
        {"id": t["id"], "name": t["name"]}
        for t in tags
    ]