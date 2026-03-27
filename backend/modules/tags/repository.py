from db.database import db_cursor

def insert_tag(name):
    with db_cursor() as cursor:
        try:
            cursor.execute("""
                INSERT INTO tags (name, collection_id)
                VALUES (?, 1)
            """, (name,))
            return True
        except:
            return False

def get_tags():
    with db_cursor() as cursor:
        cursor.execute("SELECT * FROM tags")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]

def update_tag_in_db(tag_id, name):
    with db_cursor() as cursor:
        cursor.execute("UPDATE tags SET name=? WHERE id=?", (name, tag_id))
        return True

def delete_tag_from_db(tag_id):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM item_tags WHERE tag_id=?", (tag_id,))
        cursor.execute("DELETE FROM tags WHERE id=?", (tag_id,))
        return True