from flask import Blueprint, jsonify, request
from .services import list_user_achievements, get_progress

achievement_router = Blueprint("achievements", __name__)


@achievement_router.route("/<int:user_id>", methods=["GET"])
def get_achievements(user_id):
    return jsonify(list_user_achievements(user_id))

@achievement_router.route("/all", methods=["GET"])
def get_all():
    from .repository import get_all_achievements
    return jsonify(get_all_achievements())

@achievement_router.route("/", methods=["POST"])
def create():
    data = request.json
    from .repository import create_achievement
    create_achievement(data.get("name"), data.get("description"), data.get("condition_type"), data.get("condition_value"), data.get("condition_extra"))
    return jsonify({"status": True, "message": "Global Trophy Defined"})

@achievement_router.route("/<int:ach_id>", methods=["DELETE"])
def delete_ach(ach_id):
    from .repository import delete_achievement
    delete_achievement(ach_id)
    return jsonify({"status": True, "message": "Trophy Erased"})