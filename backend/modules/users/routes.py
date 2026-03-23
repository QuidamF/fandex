from flask import Blueprint, request, jsonify
from .services import register_user, login_user

user_router = Blueprint("users", __name__)


@user_router.route("/", methods=["POST"])
def register():
    data = request.json
    return jsonify(register_user(data))


@user_router.route("/login", methods=["POST"])
def login():
    data = request.json
    return jsonify(login_user(data))