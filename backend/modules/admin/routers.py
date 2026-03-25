from flask import Blueprint, jsonify
from .services import get_stats

admin_router = Blueprint("admin", __name__)

@admin_router.route("/stats", methods=["GET"])
def stats():
    return jsonify(get_stats())

@admin_router.route("/purge", methods=["DELETE"])
def purge():
    from .services import purge_database
    return jsonify(purge_database())