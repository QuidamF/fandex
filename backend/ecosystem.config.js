module.exports = {
  apps : [{
    name: "fandex-backend",
    script: "./venv/bin/gunicorn",
    args: "-w 4 -b 0.0.0.0:5000 main:app",
    cwd: ".",
    env: {
      FLASK_ENV: "production",
      PORT: 5000
    }
  }]
}
