from db.database import db_cursor


def create_user(username, password, role_id=3):
    with db_cursor() as cursor:
        try:
            cursor.execute(
                "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
                (username, password, role_id)
            )
            return True
        except:
            return False


def get_user_by_username(username):
    with db_cursor() as cursor:
        cursor.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        )
        return cursor.fetchone()