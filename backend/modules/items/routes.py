from flask import Blueprint, request, Response, send_from_directory
from .services import list_items, create_item, update_item_service, delete_item_service, get_item_media
from core.responses import success_response, error_response
import base64
import os

item_router = Blueprint("items", __name__)

# Config
IMAGE_DIR = os.path.join(os.getcwd(), "static/images")

@item_router.route("", methods=["GET"], strict_slashes=False)
def get_items():
    return success_response(data=list_items())

@item_router.route("", methods=["POST"])
def create():
    res = create_item(request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])

@item_router.route("/<int:item_id>", methods=["PUT"])
def update(item_id):
    res = update_item_service(item_id, request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])

@item_router.route("/<int:item_id>", methods=["DELETE"])
def delete(item_id):
    res = delete_item_service(item_id)
    return success_response(message=res["message"])

@item_router.route('/<int:item_id>/image')
def serve_image(item_id):
    media = get_item_media(item_id, kind="image")
    if not media:
        return error_response("Not found", 404)
        
    if media["type"] == "file":
        return send_from_directory(IMAGE_DIR, media["filename"])
        
    if media["type"] == "base64":
        img_data = media["data"]
        header, encoded = img_data.split(",", 1)
        mime_type = header.split(":")[1].split(";")[0]
        raw_bytes = base64.b64decode(encoded)
        return Response(raw_bytes, mimetype=mime_type)
        
    return error_response("No image", 404)

@item_router.route('/<int:item_id>/thumb')
def serve_thumb(item_id):
    media = get_item_media(item_id, kind="thumb")
    if not media:
        return error_response("Not found", 404)
        
    if media["type"] == "file":
        subdir = media.get("subdir", "")
        path = os.path.join(IMAGE_DIR, subdir) if subdir else IMAGE_DIR
        return send_from_directory(path, media["filename"])
        
    return serve_image(item_id)