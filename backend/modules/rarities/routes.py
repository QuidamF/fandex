from flask import Blueprint, request
from .services import list_rarities, add_rarity, drop_rarity
from core.responses import success_response, error_response

rarity_router = Blueprint("rarities", __name__)

@rarity_router.route("/", methods=["GET"])
def fetch():
    return success_response(data=list_rarities())

@rarity_router.route("/", methods=["POST"])
def create():
    res = add_rarity(request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])

@rarity_router.route("/<int:r_id>", methods=["DELETE"])
def remove(r_id):
    res = drop_rarity(r_id)
    return success_response(message=res["message"])
