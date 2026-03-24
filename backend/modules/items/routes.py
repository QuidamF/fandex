from flask import Blueprint, jsonify, request
from .services import list_items, create_item

item_router = Blueprint("items", __name__)


@item_router.route("/", methods=["GET"])
def get_items():
    return jsonify(list_items())

@item_router.route("", methods=["POST"])
def create():
    data = request.json
    return jsonify(create_item(data))