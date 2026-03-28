from .repository import create_user, get_user_by_username, get_user_count_by_role
from core.security import hash_password, generate_token
from core.config import MAX_FANS, MAX_MODERATORS

...

def register_user(data):
    if get_user_count_by_role(3) >= MAX_FANS:
        return {"status": False, "message": "Maximum citizen capacity reached for this demo vault."}
        
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return {"status": False, "message": "Missing credentials"}

    hashed = hash_password(password)
    success = create_user(username, hashed)

    if not success:
        return {"status": False, "message": "Citizen identifier already in use"}

    return {"status": True, "message": "Citizen Registered"}


def login_user(data):
    username = data.get("username")
    password = data.get("password")

    user = get_user_by_username(username)

    if not user:
        return {"status": False, "message": "Identity Not Found"}

    hashed = hash_password(password)

    if user["password"] != hashed:
        return {"status": False, "message": "Authentication Failed"}

    token = generate_token(username)

    return {
        "status": True,
        "token": token,
        "username": username,
        "role_id": user["role_id"],
        "id": user["id"]
    }


def create_moderator(data, current_user):
    # This check should ideally be in middleware, but keeping here for now as per original
    if current_user.get("role_id") != 1:
        return {"status": False, "message": "Permission Denied"}

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
         return {"status": False, "message": "Missing credentials"}

    if get_user_count_by_role(2) >= MAX_MODERATORS:
        return {"status": False, "message": "Maximum moderator capacity reached for this demo vault."}
        
    hashed = hash_password(password)
    success = create_user(username, hashed, role_id=2)

    if not success:
        return {"status": False, "message": "Identity already exists"}

    return {"status": True, "message": "Moderator Appointed"}