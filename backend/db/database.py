import sqlite3
from contextlib import contextmanager

DB_NAME = "fandex.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

@contextmanager
def db_session():
    """Context manager for database connections. Handles commits and rollbacks."""
    conn = get_connection()
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

@contextmanager
def db_cursor():
    """Context manager for database cursors. Provides a cursor within a managed session."""
    with db_session() as conn:
        yield conn.cursor()