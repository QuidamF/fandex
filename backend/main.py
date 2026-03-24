from flask import Flask, jsonify
from flask_cors import CORS

from db.init_db import init_db
from modules.users.routes import user_router
from modules.items.routes import item_router
from modules.collection.routes import collection_router
from modules.achievements.routes import achievement_router
from modules.tags.routes import tag_router
from modules.admin.routers import admin_router

init_db()

app = Flask(__name__)

CORS(app)

CORS(app, resources={
    r"/" : {
        "origins" : "*"
    }
})

app.register_blueprint(user_router, url_prefix="/api/users")
app.register_blueprint(item_router, url_prefix="/api/items")
app.register_blueprint(collection_router, url_prefix="/api/collection")
app.register_blueprint(achievement_router, url_prefix="/api/achievements")
app.register_blueprint(tag_router, url_prefix="/api/tags")
app.register_blueprint(admin_router, url_prefix="/api/admin")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "message": "FanDex backend running"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)