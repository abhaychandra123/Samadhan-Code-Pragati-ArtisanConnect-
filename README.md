# Team Change Makers | Samadhan 2025

## Integrated Digital Ecosystem for Sustainable Livelihoods

**Organization:** UPAY (Underprivileged Advancement by Youth)  
**Event:** Samadhan 2025 – National Social Innovation Challenge  

---

## 🌍 Executive Summary

Team **Change Makers** presents a two-pronged technological solution designed to transform how NGO Skill Development Centers operate and sell.

We recognized that solving the *Livelihood Puzzle* requires addressing **both sides of the system**:

- Supply-side efficiency  
- Demand-side connection  

To achieve this, we built **two distinct yet interconnected digital tools**:

- **UPAY-Pragati** – The Operations Engine  
- **ArtisanConnect** – The Market Bridge  

Together, these platforms convert fragmented skill centers into dependable production hubs and transform corporate gifting into a year-round livelihood driver.

---

## 🚀 The Two Pillars of Innovation

### 1. UPAY-Pragati — The Operations Engine

UPAY-Pragati is an internal Progressive Web App (PWA) that functions as a **Digital Zonal Head** for NGO skill development centers.

**Core Insight**  
Every center is at a different level of readiness. Treating all centers identically leads to dropouts, quality failures, and broken commitments.

**What it does**
- Diagnoses a center’s operational maturity
- Unlocks tools only when readiness is demonstrated
- Enforces discipline, quality, and accountability at scale

**USP**  
A **Maturity Diagnosis Engine** that dynamically controls dashboards, workflows, and permissions.

---

### 2. ArtisanConnect — The Market Bridge

ArtisanConnect is a corporate-facing platform that turns gifting from a transactional activity into an emotional experience.

**Core Insight**  
Festival-only demand leads to unstable and seasonal artisan incomes.

**What it does**
- Enables QR-based traceability for every product
- Connects corporate employees directly to the artisan who made the gift
- Enables the **Birthday Gifting Model** for year-round demand

**USP**  
**Transfer of Consciousness** — the recipient experiences the human story behind the product, not just the product itself.

---

## 🛠️ Project 1: UPAY-Pragati

**Directory:** `/Pragati`

UPAY-Pragati is optimized for low-end devices and standardizes operations across UPAY’s 40+ centers.

### 🔑 Key Features

### Maturity Diagnosis Engine

Centers are categorized during onboarding into three phases:

- **Phase 1 – Aarambh**  
  Focus on mobilization, identity, and motivation  

- **Phase 2 – Saksham**  
  Focus on attendance, quality, and standardization  

- **Phase 3 – Atmanirbhar**  
  Focus on scale, payroll, and B2B bulk orders  

Each phase unlocks only the tools relevant to that level.

### Dynamic Dashboards

The user interface adapts entirely based on maturity:

- Phase 1 centers see motivation walls and attendance nudges  
- Phase 2 centers see quality checklists and templates  
- Phase 3 centers see payroll ledgers and B2B Kanban boards  

### Sakhi Squad Manager

Implements **Group Liability** through squads of five women:

- Internal backup for absenteeism  
- Improved reliability for bulk orders  
- Higher retention through collective incentives  

### Standardization Vault

A digital library of approved templates and SOPs inspired by the **Lijjat Model**:

- Poka-yoke based quality enforcement  
- Prevents deviation during scale  

### Machine Scheduler

A mobile-first horizontal scroll grid to manage shared machine resources efficiently.

---

### 💻 Tech Stack (UPAY-Pragati)

- Frontend: React (Vite), Tailwind CSS  
- State Management: React Context API (MaturityContext)  
- Icons: Lucide React  
- Storage: LocalStorage (MVP), Firebase-ready  

---

## 🎁 Project 2: ArtisanConnect

**Directory:** `/ArtisanConnect`

ArtisanConnect is designed for corporate CSR heads and employees receiving artisan-made gifts.

### 🔑 Key Features

### QR Traceability

- Each product is mapped to a specific artisan  
- QR scan reveals the product’s origin and story  

### Gift Story Page

The QR destination page displays:

- Artisan photo and video story  
- Village-level location on an interactive map  
- The journey of the product  

### Gratitude Loop

Corporate employees can send a thank-you message directly to the artisan, closing the emotional loop.

### Corporate Analytics Dashboard

For CSR and procurement leaders:

- Employment hours generated  
- Social impact metrics  
- Carbon footprint savings  

### Interactive Impact Map

Visually connects urban corporate offices to rural production clusters.

---

### 💻 Tech Stack (ArtisanConnect)

- Frontend: React (Vite), TypeScript  
- UI: Tailwind CSS, Shadcn UI  
- Backend: Supabase (Authentication and Database)  
- Visualization: Recharts (Analytics), Mapbox or Leaflet (Maps)  

---

## 📥 Installation & Local Setup

### 1. Clone the Repository

git clone [repository-url]

### 2. Setup UPAY-Pragati

cd Pragati  
npm install  
npm run dev  

Access at:  
http://localhost:5173

### 3. Setup ArtisanConnect

cd ArtisanConnect  
npm install  
npm run dev  

Access at:  
http://localhost:8080

---

## 🏆 Projected Impact Metrics

- **Operational Impact**  
  60% reduction in bulk order rejections through the Standardization Vault  

- **Financial Impact**  
  40% increase in artisan retention via the Sakhi Squad group incentive model  

- **Emotional & Market Impact**  
  Year-round corporate engagement through the Birthday Gifting Model, reducing festival dependency  

---

## 📌 Why This Matters

UPAY-Pragati ensures **supply-side reliability**.  
ArtisanConnect ensures **demand-side stability**.

Together, they form a scalable, human-centered digital livelihood ecosystem that moves NGOs from survival mode to sustainable impact.

---

**Built by Team Change Makers for Samadhan 2025**
