import hashlib
from datetime import datetime

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token(username: str):
    raw = f"{username}{datetime.utcnow()}"
    return hashlib.sha256(raw.encode()).hexdigest()