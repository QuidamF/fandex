# FanDex Development TODO

This document tracks development progress for FanDex.
Focus: simplicity, clarity, and hackathon-ready implementation.

---

## Module A — Backend (Flask + SQLite) 🔥

### 🏗️ Base Setup

* [x] Initialize Flask project structure
* [x] Add .gitignore file
* [ ] Setup SQLite connection (sqlite3)
* [ ] Create database initialization script
* [ ] Define basic schema (users, items, achievements, etc.)
* [ ] Add simple auth system (no JWT, simple token)

---

### 🧩 Core Modules

#### Users

* [ ] Register user (username + password)
* [ ] Login user
* [ ] Hash password (sha256)
* [ ] Generate simple token

---

#### Collections & Items

* [ ] Create collections table
* [ ] Create items table
* [ ] Create tags system
* [ ] Assign tags to items
* [ ] Endpoint: GET /items

---

#### User Collection

* [ ] Mark item as collected
* [ ] Store in user_items
* [ ] Prevent duplicates
* [ ] Endpoint: POST /collection
* [ ] Endpoint: GET /collection

---

#### Progress System

* [ ] Calculate total items
* [ ] Calculate collected items
* [ ] Calculate progress %
* [ ] Endpoint: GET /progress

---

### 🏆 Achievements System (KEY FEATURE)

* [ ] Create achievements table
* [ ] Define achievement types:

  * total_items
  * progress
  * tag_complete
  * rarity_count
* [ ] Implement evaluation logic (simple conditions)
* [ ] Trigger evaluation when collecting item
* [ ] Store unlocked achievements
* [ ] Endpoint: GET /achievements

---

## Module B — Frontend (React + Vite)

### 🎨 Base UI

* [ ] Setup React project
* [ ] Create layout (header + main view)
* [ ] Create item grid

---

### 🎮 Core UX

* [ ] Display items
* [ ] Mark item as collected
* [ ] Visual feedback (state change)

---

### 📊 Progress & Gamification

* [ ] Progress bar
* [ ] Achievements list
* [ ] Unlock animation / toast

---

## Module C — Testing / Validation

### 🧪 Backend Testing

* [ ] Test login flow
* [ ] Test item collection
* [ ] Test progress calculation
* [ ] Test achievements unlock

---

### 🕹️ Full Flow

* [ ] Register → Login
* [ ] View items
* [ ] Collect item
* [ ] Progress updates
* [ ] Achievement unlock

---

## 🚀 Milestones

* [ ] Backend MVP ready
* [ ] Frontend MVP ready
* [ ] Full demo ready
