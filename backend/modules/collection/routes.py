from flask import Blueprint, request, jsonify
from .services import collect_item, list_user_collection, get_progress

collection_router = Blueprint("collection", __name__)


@collection_router.route("/", methods=["POST"])
def collect():
    data = request.json
    return jsonify(collect_item(data))


@collection_router.route("/<int:user_id>", methods=["GET"])
def get_collection(user_id):
    return jsonify(list_user_collection(user_id))


@collection_router.route("/progress/<int:user_id>", methods=["GET"])
def progress(user_id):
    return jsonify(get_progress(user_id))