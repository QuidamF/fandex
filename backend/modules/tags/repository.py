from db.database import get_connection

def insert_tag(name):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO tags (name)
            VALUES (?)
        """, (name,))
        conn.commit()
        return True
    except:
        return False

def get_tags():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tags")
    return cursor.fetchall()

def update_tag_in_db(tag_id, name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tags SET name=? WHERE id=?", (name, tag_id))
    conn.commit()
    return True

def delete_tag_from_db(tag_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM item_tags WHERE tag_id=?", (tag_id,))
    cursor.execute("DELETE FROM tags WHERE id=?", (tag_id,))
    conn.commit()
    return True