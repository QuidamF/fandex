from db.database import get_connection

def get_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 3")
    fans = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 2")
    moderators = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM items")
    items = cursor.fetchone()["total"]

    return {
        "fans": fans,
        "moderators": moderators,
        "items": items
    }