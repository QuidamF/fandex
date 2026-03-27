from flask import Blueprint
from .services import get_top_users
from core.responses import success_response

ranking_router = Blueprint("ranking", __name__)

@ranking_router.route("", methods=["GET"])
def ranking():
    return success_response(data=get_top_users())
