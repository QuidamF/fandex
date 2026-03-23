from db.database import get_connection


def get_all_achievements():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM achievements")
    achievements = cursor.fetchall()

    conn.close()
    return achievements


def unlock_achievement(user_id, achievement_id):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
            VALUES (?, ?, datetime('now'))
        """, (user_id, achievement_id))
        conn.commit()
    except:
        pass  # ya existe

    finally:
        conn.close()


def get_user_achievements(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT a.*
        FROM achievements a
        JOIN user_achievements ua ON a.id = ua.achievement_id
        WHERE ua.user_id = ?
    """, (user_id,))

    result = cursor.fetchall()
    conn.close()

    return result