from flask import Blueprint, request, jsonify
from .services import create_tag, list_tags

tag_router = Blueprint("tags", __name__)

@tag_router.route("", methods=["POST"])
def create():
    return jsonify(create_tag(request.json))


@tag_router.route("", methods=["GET"])
def list_all():
    return jsonify(list_tags())