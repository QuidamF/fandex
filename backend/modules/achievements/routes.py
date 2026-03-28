from flask import Blueprint, request
from .services import list_user_achievements
from .repository import get_all_achievements, create_achievement, delete_achievement, get_total_achievement_count
from core.responses import success_response, error_response
from core.config import MAX_ACHIEVEMENTS

achievement_router = Blueprint("achievements", __name__)


@achievement_router.route("/<int:user_id>", methods=["GET"])
def get_achievements(user_id):
    return success_response(data=list_user_achievements(user_id))

@achievement_router.route("/all", methods=["GET"])
def get_all():
    return success_response(data=get_all_achievements())

@achievement_router.route("", methods=["POST"], strict_slashes=False)
def create():
    if get_total_achievement_count() >= MAX_ACHIEVEMENTS:
        return error_response(message=f"Limit reached for this demo ({MAX_ACHIEVEMENTS}). Preserve the collection by recycling existing trophies.")
    data = request.json
    create_achievement(
        data.get("name"), 
        data.get("description"), 
        data.get("condition_type"), 
        data.get("condition_value"), 
        data.get("condition_extra")
    )
    return success_response(message="Global Trophy Defined")

@achievement_router.route("/<int:ach_id>", methods=["DELETE"])
def delete_ach(ach_id):
    delete_achievement(ach_id)
    return success_response(message="Trophy Erased")