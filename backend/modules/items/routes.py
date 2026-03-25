from flask import Blueprint, jsonify, request
from .services import list_items, create_item, update_item_service, delete_item_service

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