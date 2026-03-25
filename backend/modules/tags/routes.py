from flask import Blueprint, request, jsonify
from .services import create_tag, list_tags, update_tag_service, delete_tag_service

tag_router = Blueprint("tags", __name__)

@tag_router.route("", methods=["POST"])
def create():
    return jsonify(create_tag(request.json))


@tag_router.route("", methods=["GET"])
def list_all():
    return jsonify(list_tags())

@tag_router.route("/<int:tag_id>", methods=["PUT"])
def update(tag_id):
    return jsonify(update_tag_service(tag_id, request.json))

@tag_router.route("/<int:tag_id>", methods=["DELETE"])
def delete(tag_id):
    return jsonify(delete_tag_service(tag_id))