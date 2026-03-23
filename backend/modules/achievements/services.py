from .repository import (
    get_all_achievements,
    unlock_achievement,
    get_user_achievements
)

from modules.collection.services import get_progress


def evaluate_achievements(user_id):
    print("Evaluating achievements for user:", user_id)
    achievements = get_all_achievements()
    progress = get_progress(user_id)

    for ach in achievements:

        if ach["condition_type"] == "total_items":
            if progress["collected"] >= ach["condition_value"]:
                unlock_achievement(user_id, ach["id"])

        elif ach["condition_type"] == "progress":
            if progress["percentage"] >= ach["condition_value"]:
                unlock_achievement(user_id, ach["id"])


def list_user_achievements(user_id):
    achievements = get_user_achievements(user_id)

    result = []

    for ach in achievements:
        result.append({
            "id": ach["id"],
            "name": ach["name"],
            "description": ach["description"]
        })

    return result