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
        row = cursor.fetchone()
        return dict(row) if row else None


def get_user_count_by_role(role_id):
    with db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = ?", (role_id,))
        row = cursor.fetchone()
        return row["total"] if row else 0