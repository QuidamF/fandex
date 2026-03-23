from flask import Flask, jsonify
from flask_cors import CORS

from db.init_db import init_db
from modules.users.routes import user_router
from modules.items.routes import item_router

init_db()

app = Flask(__name__)

CORS(app)

app.register_blueprint(user_router, url_prefix="/api/users")
app.register_blueprint(item_router, url_prefix="/api/items")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "message": "FanDex backend running"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)