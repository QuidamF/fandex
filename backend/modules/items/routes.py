from flask import Blueprint, jsonify, request, Response, send_from_directory
from .services import list_items, create_item, update_item_service, delete_item_service
from db.database import get_connection
import base64
import os

item_router = Blueprint("items", __name__)

# Config
IMAGE_DIR = os.path.join(os.getcwd(), "static/images")

@item_router.route("/", methods=["GET"])
def get_items():
    return jsonify(list_items())

@item_router.route("", methods=["POST"])
def create():
    data = request.json
    return jsonify(create_item(data))

@item_router.route("/<int:item_id>", methods=["PUT"])
def update(item_id):
    return jsonify(update_item_service(item_id, request.json))

@item_router.route("/<int:item_id>", methods=["DELETE"])
def delete(item_id):
    return jsonify(delete_item_service(item_id))

@item_router.route('/<int:item_id>/image')
def serve_image(item_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT image, image_filename FROM items WHERE id=?", (item_id,))
    row = c.fetchone()
    conn.close()

    if not row:
        return "Not found", 404

    # Try File System first
    if row["image_filename"]:
        return send_from_directory(IMAGE_DIR, row["image_filename"])
    
    # Fallback to Base64
    if row["image"]:
        img_data = row["image"]
        if "," in img_data:
            header, encoded = img_data.split(",", 1)
            mime_type = header.split(":")[1].split(";")[0]
            raw_bytes = base64.b64decode(encoded)
            return Response(raw_bytes, mimetype=mime_type)
        
    return "No image", 404

@item_router.route('/<int:item_id>/thumb')
def serve_thumb(item_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT image, thumb_filename FROM items WHERE id=?", (item_id,))
    row = c.fetchone()
    conn.close()

    if not row:
        return "Not found", 404

    # Try Thumb File
    if row["thumb_filename"]:
        return send_from_directory(os.path.join(IMAGE_DIR, "thumbs"), row["thumb_filename"])
    
    # Fallback to main image proxy (which will handle file or base64)
    return serve_image(item_id)