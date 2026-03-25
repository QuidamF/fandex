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
    "username": username,
    "role_id": user["role_id"],
    "id": user["id"]
}


def create_moderator(data, current_user):
    if current_user["role_id"] != 1:
        return {"status": False, "message": "Unauthorized"}

    username = data.get("username")
    password = data.get("password")

    hashed = hash_password(password)

    success = create_user(username, hashed, role_id=2)

    if not success:
        return {"status": False, "message": "User exists"}

    return {"status": True, "message": "Moderator created"}