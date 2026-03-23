# FanDex Development TODO

This document tracks development progress for FanDex.
Focus: simplicity, clarity, and hackathon-ready implementation.

---

## Module A — Backend (Flask + SQLite) 🔥

### 🏗️ Base Setup

* [x] Initialize Flask project structure
* [x] Add .gitignore file
* [x] Setup SQLite connection (sqlite3)
* [x] Create database initialization script
* [x] Define basic schema (users, items, achievements, etc.)
* [x] Add simple auth system (no JWT, simple token)

---

### 🧩 Core Modules

#### Users

* [x] Register user (username + password)
* [x] Login user
* [x] Hash password (sha256)
* [x] Generate simple token

---

#### Collections & Items

* [x] Create collections table
* [x] Create items table
* [x] Create tags system
* [x] Assign tags to items
* [x] Endpoint: GET /items

---

#### User Collection

* [x] Mark item as collected
* [x] Store in user_items
* [x] Prevent duplicates
* [x] Endpoint: POST /collection
* [x] Endpoint: GET /collection

---

#### Progress System

* [x] Calculate total items
* [x] Calculate collected items
* [x] Calculate progress %
* [x] Endpoint: GET /progress

---

### 🏆 Achievements System (KEY FEATURE)

* [x] Create achievements table
* [x] Define achievement types:

  * total_items
  * progress
  * tag_complete
  * rarity_count
* [x] Implement evaluation logic (simple conditions)
* [x] Trigger evaluation when collecting item
* [x] Store unlocked achievements
* [x] Endpoint: GET /achievements

---

## Module B — Frontend (React + Vite)

### 🎨 Base UI

* [x] Setup React project
* [x] Create layout (header + main view)
* [x] Create item grid

---

### 🎮 Core UX

* [x] Display items
* [x] Mark item as collected
* [x] Visual feedback (state change)

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

* [x] Backend MVP ready
* [ ] Frontend MVP ready
* [ ] Full demo ready
