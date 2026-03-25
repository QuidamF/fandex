from db.database import get_connection


def create_user(username, password, role_id=3):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
            (username, password, role_id)
        )
        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()


def get_user_by_username(username):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username = ?",
        (username,)
    )

    user = cursor.fetchone()
    conn.close()

    return user