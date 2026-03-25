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

### 🔑 Auth & Roles
* [x] User Registration
* [x] Role-based routing (Admin, Moderator, Fan)

---

### 🎨 Base UI

* [x] Setup React project
* [x] Create layout (header + main view)
* [x] Create item grid
* [x] Multi-view Landing Page (PublicView)
* [x] Landing Page Tabbed Navigation

---

### 🎮 Core UX

* [x] Display items
* [x] Mark item as collected
* [x] Visual feedback (state change)
* [x] Item Details Modal (interaction & overlay)
* [x] Item Grid Filters (Tag & Rarity)

---

### 📊 Progress & Gamification

* [x] Progress bar
* [x] Achievements list
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

## Module D — Advanced Polish

### 🥇 Ranking & Multimedia

* [x] Item Image Storage & Visual Support (Base64)
* [x] Top Collectors Ranking Aggregation (Live Database)
* [x] Public Landing System (Ranking Hydration)

### 🎨 UI & Theming (Vintage Archive)

* [x] Login View Redesign (Fine line, warm lighting, glassmorphism)
* [x] Vault Dashboard Redesign (Premium Museum aesthetic, gold accents, deep darks)
* [x] Animated Edge-Glow Hover Item Cards
* [x] Universal Edge-Glow expansions (Modals & Achievements)
* [x] Admin Control Center Redesign
* [x] Moderator Curator Desk Redesign (Including Visualizer Grid)
* [x] Moderator Curator Desk Redesign (Including Visualizer Grid)
* [x] Full Stack CRUD Architecture for Moderator Operations
* [x] Dynamic Collection Identity Metadata Editor (Curator)
* [x] Public Landing (MVP 2 Redesign to Final Architecture)
* [x] Explict React Router DOM Architecture Implementation (Protected Routes + LocalStorage)
* [x] Epic Rarity Tier and Dynamic Semantic Luminous Edge Effects

---

## 🚀 Milestones

* [x] Backend MVP ready
* [x] Frontend MVP ready
* [ ] Full demo ready
