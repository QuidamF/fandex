# 🏛️ FanDex - Digital Museum & Artifact Collection

FanDex is a premium, mobile-first platform designed for collectors and curators to exhibit digital artifacts. It features a dynamic rarity system, automated trophy evaluation, and an optimized image delivery engine.

## ✨ Features

- **📱 Mobile-First Design**: Fully responsive UI across all roles (Fan, Moderator, Admin, Public).
- **🖼️ Image Optimization**: Automatic WebP conversion and thumbnail generation for high-performance browsing.
- **💎 Rarity Studio**: Real-time customization of rarity tiers, colors, and visual effects.
- **🏆 Achievement Engine**: Automated evaluation of collection milestones and trophies.
- **🔒 Secure Configuration**: Environment-based API URLs and protected credentials.

## 🛠️ Tech Stack

- **Backend**: Python / Flask / SQLite
- **Frontend**: React / Vite / Vanilla CSS
- **Image Processing**: Pillow (Optimized WebP)

---

## 🚀 Quick Start

### 1. Prerrequisites
- Python 3.10+
- Node.js 18+

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Configure your admin credentials
python main.py
```
*The server will run on `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.development # Configure your VITE_API_URL
npm run dev
```
*The app will run on `http://localhost:5173`*

---

## 🎨 Role Credentials (Demo)

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` |
| **Moderator** | `mod1` | `1234` |
| **Fan** | `edgar` | `1234` |

---

## 📦 Project Structure

- `/backend`: Flask API, Database models, and Image processing logic.
- `/frontend`: React components, custom hooks, and museum styles.
- `/backend/static/images`: Optimized artifact assets (Ignored by Git).

---

## 📝 License
FanDex - Private Project. Built with ❤️ for the collection community.
