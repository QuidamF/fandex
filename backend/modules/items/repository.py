from db.database import get_connection


def get_all_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT i.*, GROUP_CONCAT(DISTINCT t.name) as tags
        FROM items i
        LEFT JOIN item_tags it ON i.id = it.item_id
        LEFT JOIN tags t ON it.tag_id = t.id
        GROUP BY i.id
    """)

    items = cursor.fetchall()
    conn.close()

    return items