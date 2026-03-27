from db.database import db_cursor


def get_all_items():
    with db_cursor() as cursor:
        cursor.execute("""
            SELECT i.*, r.color_hex as rarity_color, GROUP_CONCAT(DISTINCT t.name) as tags
            FROM items i
            LEFT JOIN rarities r ON i.rarity = r.name
            LEFT JOIN item_tags it ON i.id = it.item_id
            LEFT JOIN tags t ON it.tag_id = t.id
            GROUP BY i.id
            ORDER BY r.tier DESC, i.name ASC
        """)
        return cursor.fetchall()

def get_item_by_id(item_id):
    with db_cursor() as cursor:
        cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
        return cursor.fetchone()

def insert_item(name, rarity, description, image=None, image_filename=None, thumb_filename=None):
    with db_cursor() as cursor:
        cursor.execute("""
            INSERT INTO items (name, rarity, description, image, image_filename, thumb_filename)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, rarity, description, image, image_filename, thumb_filename))
        return cursor.lastrowid

def insert_item_tag(item_id, name):
    with db_cursor() as cursor:
        # Find or create the tag by name
        cursor.execute("SELECT id FROM tags WHERE name = ?", (name,))
        row = cursor.fetchone()
        
        if row:
            tag_id = row["id"]
        else:
            cursor.execute("INSERT INTO tags (name, collection_id) VALUES (?, 1)", (name,))
            tag_id = cursor.lastrowid

        cursor.execute("""
            INSERT OR IGNORE INTO item_tags (item_id, tag_id)
            VALUES (?, ?)
        """, (item_id, tag_id))


def update_item_in_db(item_id, name, rarity, description, image=None, image_filename=None, thumb_filename=None):
    with db_cursor() as cursor:
        if image_filename:
            cursor.execute("""
                UPDATE items 
                SET name=?, rarity=?, description=?, image='', image_filename=?, thumb_filename=?
                WHERE id=?
            """, (name, rarity, description, image_filename, thumb_filename, item_id))
        elif image:
            cursor.execute("""
                UPDATE items 
                SET name=?, rarity=?, description=?, image=?, image_filename=NULL, thumb_filename=NULL
                WHERE id=?
            """, (name, rarity, description, image, item_id))
        else:
            cursor.execute("""
                UPDATE items 
                SET name=?, rarity=?, description=?
                WHERE id=?
            """, (name, rarity, description, item_id))

def delete_item_from_db(item_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM user_items WHERE item_id=?", (item_id,))
        cursor.execute("DELETE FROM item_tags WHERE item_id=?", (item_id,))
        cursor.execute("DELETE FROM items WHERE id=?", (item_id,))

def clear_item_tags(item_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM item_tags WHERE item_id=?", (item_id,))