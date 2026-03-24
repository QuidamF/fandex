from flask import Blueprint, jsonify
from .services import get_top_users

ranking_router = Blueprint("ranking", __name__)

@ranking_router.route("", methods=["GET"])
def ranking():
    return jsonify(get_top_users())
