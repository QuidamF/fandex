from db.database import db_cursor


def add_user_item(user_id, item_id):
    with db_cursor() as cursor:
        try:
            cursor.execute(
                "INSERT INTO user_items (user_id, item_id) VALUES (?, ?)",
                (user_id, item_id)
            )
            return True
        except:
            return False


def get_user_items(user_id):
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT i.*, r.color_hex as rarity_color
            FROM items i
            LEFT JOIN rarities r ON i.rarity = r.name
            JOIN user_items ui ON i.id = ui.item_id
            WHERE ui.user_id = ?
            ORDER BY r.tier DESC, i.name ASC
        """, (user_id,))
        return cursor.fetchall()

def get_total_items():
    with db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) as total FROM items")
        row = cursor.fetchone()
        return row["total"] if row else 0


def get_user_collected_count(user_id):
    with db_cursor() as cursor:
        cursor.execute(
            "SELECT COUNT(*) as total FROM user_items WHERE user_id = ?",
            (user_id,)
        )
        row = cursor.fetchone()
        return row["total"] if row else 0

def get_collection_info(collection_id=1):
    with db_cursor() as cursor:
        cursor.execute("SELECT name, description FROM collections WHERE id=?", (collection_id,))
        row = cursor.fetchone()
        return dict(row) if row else {"name": "Unknown", "description": ""}

def update_collection_info(name, description, collection_id=1):
    with db_cursor() as cursor:
        cursor.execute("UPDATE collections SET name=?, description=? WHERE id=?", (name, description, collection_id))
        return True