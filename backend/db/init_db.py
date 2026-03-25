from dotenv import load_dotenv
import os
from core.security import hash_password
from db.database import get_connection

load_dotenv()

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Roles
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
    """)

    # Users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id INTEGER,
        FOREIGN KEY (role_id) REFERENCES roles(id)
    )
    """)

    # Collections
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS collections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_by INTEGER
    )
    """)

    # Items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        rarity TEXT DEFAULT 'common',
        description TEXT,
        image TEXT,
        collection_id INTEGER,
        created_by INTEGER,
        FOREIGN KEY (collection_id) REFERENCES collections(id)
    )
    """)

    # Tags
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        collection_id INTEGER
    )
    """)

    # Rarities
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS rarities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        color_hex TEXT NOT NULL,
        collection_id INTEGER
    )
    """)

    # Item-Tags
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS item_tags (
        item_id INTEGER,
        tag_id INTEGER,
        UNIQUE(item_id, tag_id)
    )
    """)

    # User Items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_items (
        user_id INTEGER,
        item_id INTEGER,
        UNIQUE(user_id, item_id)
    )
    """)

    # Achievements
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        condition_type TEXT,
        condition_value INTEGER,
        condition_extra TEXT,
        collection_id INTEGER
    )
    """)

    # User Achievements
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_achievements (
        user_id INTEGER,
        achievement_id INTEGER,
        unlocked_at TEXT,
        UNIQUE(user_id, achievement_id)
    )
    """)

    # Seed roles
    cursor.execute("INSERT OR IGNORE INTO roles (id, name) VALUES (1, 'admin')")
    cursor.execute("INSERT OR IGNORE INTO roles (id, name) VALUES (2, 'moderator')")
    cursor.execute("INSERT OR IGNORE INTO roles (id, name) VALUES (3, 'user')")

    admin_user = os.getenv("ADMIN_USERNAME")
    admin_pass = os.getenv("ADMIN_PASSWORD")

    if admin_user and admin_pass:
        cursor.execute("""
            INSERT OR IGNORE INTO users (id, username, password, role_id)
            VALUES (1, ?, ?, 1)
        """, (admin_user, hash_password(admin_pass)))

    # Only seed demo data if the collections table is completely virgin
    cursor.execute("SELECT COUNT(*) as c FROM collections")
    if cursor.fetchone()["c"] == 0:
        cursor.execute("INSERT INTO collections (id, name, description) VALUES (1, 'How to Train Your Dragon', 'Demo collection')")
        cursor.execute("INSERT INTO tags (id, name, collection_id) VALUES (1, 'Posters', 1)")
        cursor.execute("INSERT INTO tags (id, name, collection_id) VALUES (2, 'Figures', 1)")
        
        cursor.execute("INSERT INTO rarities (name, color_hex, collection_id) VALUES ('common', '#9ca3af', 1)")
        cursor.execute("INSERT INTO rarities (name, color_hex, collection_id) VALUES ('rare', '#60a5fa', 1)")
        cursor.execute("INSERT INTO rarities (name, color_hex, collection_id) VALUES ('epic', '#c084fc', 1)")
        cursor.execute("INSERT INTO rarities (name, color_hex, collection_id) VALUES ('legendary', '#d4af37', 1)")
        
        cursor.execute("INSERT INTO items (id, name, description, image, rarity, collection_id) VALUES (1, 'Toothless Poster', 'Movie poster', '', 'common', 1)")
        cursor.execute("INSERT INTO items (id, name, description, image, rarity, collection_id) VALUES (2, 'Toothless Figure', 'Collectible figure', '', 'rare', 1)")
        
        cursor.execute("INSERT INTO item_tags (item_id, tag_id) VALUES (1, 1)")
        cursor.execute("INSERT INTO item_tags (item_id, tag_id) VALUES (2, 2)")
        
        cursor.execute("INSERT INTO achievements (id, name, description, condition_type, condition_value) VALUES (1, 'First Item', 'Collect your first item', 'total_items', 1)")
        cursor.execute("INSERT INTO achievements (id, name, description, condition_type, condition_value) VALUES (2, 'Halfway There', 'Reach 50% progress', 'progress', 50)")


    conn.commit()
    conn.close()

    print("Database initialized successfully.")