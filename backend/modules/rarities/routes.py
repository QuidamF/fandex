from flask import Blueprint, jsonify, request
from .services import list_rarities, add_rarity, drop_rarity

rarity_router = Blueprint("rarities", __name__)

@rarity_router.route("/", methods=["GET"])
def fetch():
    return jsonify(list_rarities())

@rarity_router.route("/", methods=["POST"])
def create():
    return jsonify(add_rarity(request.json))

@rarity_router.route("/<int:r_id>", methods=["DELETE"])
def remove(r_id):
    return jsonify(drop_rarity(r_id))
