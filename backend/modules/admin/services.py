from db.database import db_cursor

def get_stats():
    with db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 3")
        row_fans = cursor.fetchone()
        fans = row_fans["total"] if row_fans else 0

        cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 2")
        row_mods = cursor.fetchone()
        moderators = row_mods["total"] if row_mods else 0

        cursor.execute("SELECT COUNT(*) as total FROM items")
        row_items = cursor.fetchone()
        items = row_items["total"] if row_items else 0

        return {
            "fans": fans,
            "moderators": moderators,
            "items": items
        }

def purge_database():
    try:
        with db_cursor() as cursor:
            # Relational cascades
            cursor.execute("DELETE FROM user_items")
            cursor.execute("DELETE FROM item_tags")
            cursor.execute("DELETE FROM user_achievements")

            # Core tables
            cursor.execute("DELETE FROM items")
            cursor.execute("DELETE FROM tags")
            cursor.execute("DELETE FROM rarities")
            cursor.execute("DELETE FROM achievements")
            
            # Reset Identity
            cursor.execute("UPDATE collections SET name='Unnamed Vault', description='Awaiting curation...' WHERE id=1")
            
            # Identity tables (leaving admin safe)
            cursor.execute("DELETE FROM users WHERE role_id != 1")

            return {"status": True, "message": "SYSTEM PURGE COMPLETE. Vault zeroed."}
    except Exception as e:
        return {"status": False, "message": str(e)}