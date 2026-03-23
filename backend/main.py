from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "message": "FanDex backend running"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)