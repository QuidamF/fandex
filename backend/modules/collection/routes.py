from flask import Blueprint, request, jsonify
from .services import collect_item, list_user_collection

collection_router = Blueprint("collection", __name__)


@collection_router.route("/", methods=["POST"])
def collect():
    data = request.json
    return jsonify(collect_item(data))


@collection_router.route("/<int:user_id>", methods=["GET"])
def get_collection(user_id):
    return jsonify(list_user_collection(user_id))