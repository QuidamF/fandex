from db.database import db_cursor

def get_top_users():
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT users.username as user, COUNT(user_items.item_id) as count
            FROM user_items
            JOIN users ON user_items.user_id = users.id
            GROUP BY user_items.user_id
            ORDER BY count DESC
            LIMIT 5
        """)
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
