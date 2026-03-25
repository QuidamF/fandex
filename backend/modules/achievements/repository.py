from db.database import get_connection


def get_all_achievements():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM achievements")
    rows = cursor.fetchall()
    
    achievements = [dict(row) for row in rows]

    conn.close()
    return achievements

def create_achievement(name, description, condition_type, condition_value, condition_extra):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO achievements (name, description, condition_type, condition_value, condition_extra, collection_id)
        VALUES (?, ?, ?, ?, ?, 1)
    """, (name, description, condition_type, condition_value, condition_extra))
    conn.commit()
    conn.close()
    return True

def delete_achievement(achievement_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user_achievements WHERE achievement_id = ?", (achievement_id,))
    cursor.execute("DELETE FROM achievements WHERE id = ?", (achievement_id,))
    conn.commit()
    conn.close()
    return True


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