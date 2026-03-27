from db.database import db_cursor


def get_all_achievements():
    with db_cursor() as cursor:
        cursor.execute("SELECT * FROM achievements")
        return cursor.fetchall()

def create_achievement(name, description, condition_type, condition_value, condition_extra):
    with db_cursor() as cursor:
        cursor.execute("""
            INSERT INTO achievements (name, description, condition_type, condition_value, condition_extra, collection_id)
            VALUES (?, ?, ?, ?, ?, 1)
        """, (name, description, condition_type, condition_value, condition_extra))
        return True

def delete_achievement(achievement_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM user_achievements WHERE achievement_id = ?", (achievement_id,))
        cursor.execute("DELETE FROM achievements WHERE id = ?", (achievement_id,))
        return True


def unlock_achievement(user_id, achievement_id):
    with db_cursor() as cursor:
        try:
            cursor.execute("""
                INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
                VALUES (?, ?, datetime('now'))
            """, (user_id, achievement_id))
            return True
        except:
            return False


def get_user_achievements(user_id):
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT a.*
            FROM achievements a
            JOIN user_achievements ua ON a.id = ua.achievement_id
            WHERE ua.user_id = ?
        """, (user_id,))
        return cursor.fetchall()