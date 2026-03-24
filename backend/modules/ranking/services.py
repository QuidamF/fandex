from db.database import get_connection

def get_top_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT users.username as user, COUNT(user_items.item_id) as count
        FROM user_items
        JOIN users ON user_items.user_id = users.id
        GROUP BY user_items.user_id
        ORDER BY count DESC
        LIMIT 5
    """)
    rows = cursor.fetchall()
    return [{"user": r["user"], "count": r["count"]} for r in rows]
