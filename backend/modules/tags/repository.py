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