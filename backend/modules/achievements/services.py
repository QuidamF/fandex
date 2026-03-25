from .repository import (
    get_all_achievements,
    unlock_achievement,
    get_user_achievements
)

from modules.collection.services import get_progress


def evaluate_achievements(user_id):
    achievements = get_all_achievements()
    progress = get_progress(user_id)
    from db.database import get_connection
    conn = get_connection()
    cursor = conn.cursor()

    for ach in achievements:
        c_type = ach["condition_type"]
        c_val = ach["condition_value"]
        c_extra = ach["condition_extra"]

        if c_type == "total_items":
            if progress["collected"] >= c_val:
                unlock_achievement(user_id, ach["id"])

        elif c_type == "progress":
            if progress["percentage"] >= c_val:
                unlock_achievement(user_id, ach["id"])

        elif c_type == "rarity":
            cursor.execute("SELECT COUNT(*) as c FROM items i JOIN user_items ui ON i.id=ui.item_id WHERE ui.user_id=? AND i.rarity=?", (user_id, c_extra))
            count = cursor.fetchone()["c"]
            
            target = c_val
            if c_val == -1:
                cursor.execute("SELECT COUNT(*) as t FROM items WHERE rarity=?", (c_extra,))
                target = cursor.fetchone()["t"]
            
            if target > 0 and count >= target:
                unlock_achievement(user_id, ach["id"])

        elif c_type == "tag":
            cursor.execute("""
                SELECT COUNT(DISTINCT i.id) as c 
                FROM items i 
                JOIN user_items ui ON i.id=ui.item_id 
                JOIN item_tags it ON i.id=it.item_id 
                JOIN tags t ON it.tag_id=t.id
                WHERE ui.user_id=? AND t.name=?
            """, (user_id, c_extra))
            count = cursor.fetchone()["c"]
            
            target = c_val
            if c_val == -1:
                cursor.execute("""
                    SELECT COUNT(DISTINCT item_id) as t FROM item_tags it JOIN tags t ON it.tag_id=t.id WHERE t.name=?
                """, (c_extra,))
                target = cursor.fetchone()["t"]

            if target > 0 and count >= target:
                unlock_achievement(user_id, ach["id"])

    conn.close()


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