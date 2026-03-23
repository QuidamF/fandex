from db.database import get_connection


def add_user_item(user_id, item_id):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO user_items (user_id, item_id) VALUES (?, ?)",
            (user_id, item_id)
        )
        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()


def get_user_items(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT i.*
        FROM items i
        JOIN user_items ui ON i.id = ui.item_id
        WHERE ui.user_id = ?
    """, (user_id,))

    items = cursor.fetchall()
    conn.close()

    return items

def get_total_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM items")
    total = cursor.fetchone()["total"]

    conn.close()
    return total


def get_user_collected_count(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) as total FROM user_items WHERE user_id = ?",
        (user_id,)
    )

    total = cursor.fetchone()["total"]

    conn.close()
    return total