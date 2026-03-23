from .repository import create_user, get_user_by_username
from core.security import hash_password, generate_token


def register_user(data):
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return {"status": False, "message": "Missing fields"}

    hashed = hash_password(password)

    success = create_user(username, hashed)

    if not success:
        return {"status": False, "message": "User already exists"}

    return {"status": True, "message": "User created"}


def login_user(data):
    username = data.get("username")
    password = data.get("password")

    user = get_user_by_username(username)

    if not user:
        return {"status": False, "message": "User not found"}

    hashed = hash_password(password)

    if user["password"] != hashed:
        return {"status": False, "message": "Invalid credentials"}

    token = generate_token(username)

    return {
        "status": True,
        "token": token,
        "username": username
    }