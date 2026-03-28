module.exports = {
  apps : [{
    name: "fandex-backend",
    script: "gunicorn",
    args: "-w 4 -b 0.0.0.0:5000 main:app",
    cwd: "/home/edgar-ld/Documentos/Proyectos/fandex/backend",
    interpreter: "python3",
    env: {
      FLASK_ENV: "production",
      PORT: 5000
    }
  }]
}
