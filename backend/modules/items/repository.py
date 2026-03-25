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

def insert_item(name, rarity, description, image=None):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO items (name, rarity, description, image)
        VALUES (?, ?, ?, ?)
    """, (name, rarity, description, image))

    conn.commit()

    return cursor.lastrowid

def insert_item_tag(item_id, name):
    conn = get_connection()
    cursor = conn.cursor()

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

    conn.commit()


def update_item_in_db(item_id, name, rarity, description, image=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE items 
        SET name=?, rarity=?, description=?, image=?
        WHERE id=?
    """, (name, rarity, description, image, item_id))
    conn.commit()

def delete_item_from_db(item_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user_items WHERE item_id=?", (item_id,))
    cursor.execute("DELETE FROM item_tags WHERE item_id=?", (item_id,))
    cursor.execute("DELETE FROM items WHERE id=?", (item_id,))
    conn.commit()

def clear_item_tags(item_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM item_tags WHERE item_id=?", (item_id,))
    conn.commit()