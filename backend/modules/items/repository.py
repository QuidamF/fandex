from db.database import db_cursor


def get_all_items():
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT i.*, r.color_hex as rarity_color, GROUP_CONCAT(t.name) as tags
            FROM items i
            LEFT JOIN rarities r ON i.rarity = r.name
            LEFT JOIN item_tags it ON i.id = it.item_id
            LEFT JOIN tags t ON it.tag_id = t.id
            GROUP BY i.id
        """)
        rows = cursor.fetchall()
        return [dict(row) for row in rows]


def get_total_item_count():
    with db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) as total FROM items")
        row = cursor.fetchone()
        return row["total"] if row else 0


def get_item_by_id(item_id):
    with db_cursor() as cursor:
        cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
        row = cursor.fetchone()
        return dict(row) if row else None


def insert_item(name, rarity, description, image, image_filename, thumb_filename):
    with db_cursor() as cursor:
        cursor.execute("""
            INSERT INTO items (name, rarity, description, image, image_filename, thumb_filename)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, rarity, description, image, image_filename, thumb_filename))
        return cursor.lastrowid


def update_item_in_db(item_id, name, rarity, description, image, image_filename, thumb_filename):
    with db_cursor() as cursor:
        if image_filename:
            cursor.execute("""
                UPDATE items 
                SET name=?, rarity=?, description=?, image=?, image_filename=?, thumb_filename=?
                WHERE id=?
            """, (name, rarity, description, image, image_filename, thumb_filename, item_id))
        else:
            cursor.execute("""
                UPDATE items 
                SET name=?, rarity=?, description=?
                WHERE id=?
            """, (name, rarity, description, item_id))
        return True


def delete_item_from_db(item_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM user_items WHERE item_id = ?", (item_id,))
        cursor.execute("DELETE FROM item_tags WHERE item_id = ?", (item_id,))
        cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))
        return True


def insert_item_tag(item_id, tag_name):
    with db_cursor() as cursor:
        # Get tag id
        cursor.execute("SELECT id FROM tags WHERE name = ?", (tag_name,))
        tag = cursor.fetchone()
        if tag:
            try:
                cursor.execute("INSERT INTO item_tags (item_id, tag_id) VALUES (?, ?)", (item_id, tag["id"]))
            except:
                pass # Already tagged
        return True


def clear_item_tags(item_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM item_tags WHERE item_id = ?", (item_id,))
        return True


def get_items_by_tag(tag_name):
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT i.*, r.color_hex as rarity_color
            FROM items i
            JOIN item_tags it ON i.id = it.item_id
            JOIN tags t ON it.tag_id = t.id
            LEFT JOIN rarities r ON i.rarity = r.name
            WHERE t.name = ?
        """, (tag_name,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]