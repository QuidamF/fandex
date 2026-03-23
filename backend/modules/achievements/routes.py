from flask import Blueprint, jsonify
from .services import list_user_achievements, get_progress

achievement_router = Blueprint("achievements", __name__)


@achievement_router.route("/<int:user_id>", methods=["GET"])
def get_achievements(user_id):
    return jsonify(list_user_achievements(user_id))

#@achievement_router.route("/<int:user_id>", methods=["GET"])
#def get_achievements(user_id):
#    return jsonify(get_progress(user_id))