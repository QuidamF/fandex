from flask import Blueprint, request
from .services import create_tag, list_tags, update_tag_service, delete_tag_service
from core.responses import success_response, error_response

tag_router = Blueprint("tags", __name__)

@tag_router.route("", methods=["POST"])
def create():
    res = create_tag(request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])


@tag_router.route("", methods=["GET"])
def list_all():
    return success_response(data=list_tags())

@tag_router.route("/<int:tag_id>", methods=["PUT"])
def update(tag_id):
    res = update_tag_service(tag_id, request.json)
    if res["status"]:
        return success_response(message=res["message"])
    return error_response(message=res["message"])

@tag_router.route("/<int:tag_id>", methods=["DELETE"])
def delete(tag_id):
    res = delete_tag_service(tag_id)
    return success_response(message=res["message"])