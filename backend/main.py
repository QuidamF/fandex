from flask import Flask, jsonify
from flask_cors import CORS

from db.init_db import init_db
from modules.users.routes import user_router
from modules.items.routes import item_router
from modules.collection.routes import collection_router
from modules.achievements.routes import achievement_router
from modules.tags.routes import tag_router
from modules.admin.routers import admin_router
from modules.ranking.routes import ranking_router
from modules.rarities.routes import rarity_router
from core.config import ALLOWED_ORIGINS

init_db()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

app.register_blueprint(user_router, url_prefix="/api/users")
app.register_blueprint(item_router, url_prefix="/api/items")
app.register_blueprint(collection_router, url_prefix="/api/collection")
app.register_blueprint(achievement_router, url_prefix="/api/achievements")
app.register_blueprint(tag_router, url_prefix="/api/tags")
app.register_blueprint(admin_router, url_prefix="/api/admin")
app.register_blueprint(ranking_router, url_prefix="/api/ranking")
app.register_blueprint(rarity_router, url_prefix="/api/rarities")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "message": "FanDex backend running"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)