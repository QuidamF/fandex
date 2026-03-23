from flask import Blueprint, jsonify
from .services import list_items

item_router = Blueprint("items", __name__)


@item_router.route("/", methods=["GET"])
def get_items():
    return jsonify(list_items())