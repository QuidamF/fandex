from flask import Blueprint, jsonify, request, Response
from .services import list_items, create_item, update_item_service, delete_item_service
from db.database import get_connection
import base64

item_router = Blueprint("items", __name__)


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
    c.execute("SELECT image FROM items WHERE id=?", (item_id,))
    row = c.fetchone()
    if not row or not row["image"]: 
        return "Not found", 404
    
    img_data = row["image"]
    if not img_data.startswith("data:image"):
        return "Invalid format", 400
        
    header, encoded = img_data.split(",", 1)
    mime_type = header.split(":")[1].split(";")[0]
    raw_bytes = base64.b64decode(encoded)
    
    # Allows the Browser to cache and leverage long HTTP parallel streaming
    return Response(raw_bytes, mimetype=mime_type)