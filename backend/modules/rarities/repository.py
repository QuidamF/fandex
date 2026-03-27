from db.database import db_cursor

def get_all_rarities():
    with db_cursor() as cursor:
        cursor.execute("SELECT * FROM rarities ORDER BY tier ASC")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]

def create_rarity(name, color_hex, tier):
    with db_cursor() as cursor:
        try:
            cursor.execute("INSERT INTO rarities (name, color_hex, tier, collection_id) VALUES (?, ?, ?, 1)", (name, color_hex, tier))
            return True
        except:
            return False

def delete_rarity(r_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM rarities WHERE id = ?", (r_id,))
        return True
