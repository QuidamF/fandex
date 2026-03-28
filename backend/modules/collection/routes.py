from flask import Blueprint, request
from .services import collect_item, list_user_collection, get_progress, fetch_collection_info, modify_collection_info
from core.responses import success_response, error_response

collection_router = Blueprint("collection", __name__)


@collection_router.route("", methods=["POST"], strict_slashes=False)
def collect():
    res = collect_item(request.json)
    if res["status"]:
        return success_response(message=res["message"], unlocked=res.get("unlocked", []))
    return error_response(message=res["message"])


@collection_router.route("/<int:user_id>", methods=["GET"])
def get_collection(user_id):
    return success_response(data=list_user_collection(user_id))


@collection_router.route("/progress/<int:user_id>", methods=["GET"])
def progress(user_id):
    return success_response(data=get_progress(user_id))


@collection_router.route("/info", methods=["GET"])
def get_info():
    res = fetch_collection_info()
    return success_response(data=res["data"])


@collection_router.route("/info", methods=["PUT"])
def update_info():
    res = modify_collection_info(request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])