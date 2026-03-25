from db.database import get_connection

def get_all_rarities():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM rarities ORDER BY tier ASC")
    rows = cursor.fetchall()
    rarities = [dict(row) for row in rows]
    conn.close()
    return rarities

def create_rarity(name, color_hex, tier):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO rarities (name, color_hex, tier, collection_id) VALUES (?, ?, ?, 1)", (name, color_hex, tier))
        conn.commit()
    except Exception as e:
        conn.close()
        return False
    conn.close()
    return True

def delete_rarity(r_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM rarities WHERE id = ?", (r_id,))
    conn.commit()
    conn.close()
    return True
