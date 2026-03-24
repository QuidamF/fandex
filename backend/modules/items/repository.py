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

def insert_item(name, rarity, description):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO items (name, rarity, description)
        VALUES (?, ?, ?)
    """, (name, rarity, description))

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