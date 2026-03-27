from flask import Blueprint
from .services import get_stats, purge_database
from core.responses import success_response, error_response

admin_router = Blueprint("admin", __name__)

@admin_router.route("/stats", methods=["GET"])
def stats():
    return success_response(data=get_stats())

@admin_router.route("/purge", methods=["DELETE"])
def purge():
    res = purge_database()
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])