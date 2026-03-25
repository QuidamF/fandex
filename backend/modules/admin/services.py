from db.database import get_connection

def get_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 3")
    fans = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM users WHERE role_id = 2")
    moderators = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM items")
    items = cursor.fetchone()["total"]

    return {
        "fans": fans,
        "moderators": moderators,
        "items": items
    }

def purge_database():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # Relational cascades
        cursor.execute("DELETE FROM user_items")
        cursor.execute("DELETE FROM item_tags")
        cursor.execute("DELETE FROM user_achievements")

        # Core tables
        cursor.execute("DELETE FROM items")
        cursor.execute("DELETE FROM tags")
        cursor.execute("DELETE FROM achievements")
        
        # Identity tables (leaving admin safe)
        cursor.execute("DELETE FROM users WHERE role_id != 1")

        conn.commit()
        return {"status": True, "message": "SYSTEM PURGE COMPLETE. Vault zeroed."}
    except Exception as e:
        return {"status": False, "message": str(e)}
    finally:
        conn.close()