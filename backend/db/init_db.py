from db.database import get_connection

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
        description TEXT,
        image TEXT,
        rarity TEXT,
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

    




    # Seed collection
    cursor.execute("""
    INSERT OR IGNORE INTO collections (id, name, description)
    VALUES (1, 'How to Train Your Dragon', 'Demo collection')
    """)

    # Seed tags
    cursor.execute("INSERT OR IGNORE INTO tags (id, name, collection_id) VALUES (1, 'Posters', 1)")
    cursor.execute("INSERT OR IGNORE INTO tags (id, name, collection_id) VALUES (2, 'Figures', 1)")

    # Seed items
    cursor.execute("""
    INSERT OR IGNORE INTO items (id, name, description, image, rarity, collection_id)
    VALUES (1, 'Toothless Poster', 'Movie poster', '', 'common', 1)
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO items (id, name, description, image, rarity, collection_id)
    VALUES (2, 'Toothless Figure', 'Collectible figure', '', 'rare', 1)
    """)

    # Assign tags
    cursor.execute("INSERT OR IGNORE INTO item_tags (item_id, tag_id) VALUES (1, 1)")
    cursor.execute("INSERT OR IGNORE INTO item_tags (item_id, tag_id) VALUES (2, 2)")

    conn.commit()
    conn.close()

    print("Database initialized successfully.")