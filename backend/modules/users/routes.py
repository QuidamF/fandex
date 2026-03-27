from flask import Blueprint, request
from .services import register_user, login_user, create_moderator
from core.responses import success_response, error_response

user_router = Blueprint("users", __name__)


@user_router.route("/", methods=["POST"])
def register():
    res = register_user(request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])


@user_router.route("/login", methods=["POST"])
def login():
    res = login_user(request.json)
    if res["status"]:
        return success_response(message="Welcome back", **res)
    return error_response(message=res["message"])


@user_router.route("/create-moderator", methods=["POST"])
def create_mod():
    # TODO: Proper auth middleware instead of this mock
    current_user = {"role_id": 1} 
    
    res = create_moderator(request.json, current_user)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])