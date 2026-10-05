# Hotel-Management-System

A modern, full-featured Hotel Management and Billing Web Application migrated from Java to React and TypeScript on Vite.

> **Project Report & Submission Document:** See [PROJECT_REPORT.md](./PROJECT_REPORT.md) for the complete academic and technical evaluation submission covering Innovation, Implementation, Problem Solving, Working Model, Technical Knowledge, and GitHub details.

---

## 📑 Project Submission Report Summary

### 1. Innovation & Originality of Idea
- **Dual-Paradigm Architecture:** Harmoniously integrates a high-performance modern web interface with a built-in virtual Java CLI terminal emulator that preserves and runs the original console commands (`java HotelManagementSystem`).
- **Live Bidirectional Synchronization:** Bookings and checkouts made in the web UI immediately reflect in the terminal emulator, and vice versa.
- **Zero-Latency Front-Desk Operations:** Instant bill calculation ($Days \times Rate$) and printable digital tax invoices.

### 2. Technical Implementation & Functionality
- **Frontend Framework:** React 19 + TypeScript 5.7 (Strict mode, zero errors).
- **Styling & UI:** Tailwind CSS 4 with Lucide React iconography.
- **State & Persistence:** Resilient local storage persistence with automatic seeding and rollback safeguards.
- **Core Modules:** Room Inventory Management, Customer Registration & Booking Engine, Check-Out & Billing Service, Active Bookings Roster, Billing History Archive, and Java CLI Emulator.

### 3. Problem-Solving Approach
- **Eliminating Double-Booking:** Atomic room status transitions (`isBooked: boolean`) preventing conflicting reservations.
- **Mathematical Accuracy:** Deterministic billing formulas preventing front-desk arithmetic mistakes.
- **Real-Time Visibility:** Executive KPIs (Occupancy Rate, Available Inventory, Active Guests, Total Invoiced Revenue).

### 4. Practical Demonstration / Working Model
- **Live Preview URL:** Deployed and accessible on AI Studio Cloud Run.
- **Functional Scenarios:**
  - View room inventory with category and status filters.
  - Quick book available rooms with customer details and stay durations.
  - One-click checkout with automated bill calculations and printable invoice receipts.
  - Interactive terminal emulator executing original Java options 1 to 5.

### 5. Technical Knowledge & Explanation
- **Data Models:** Strongly-typed contracts for `Room`, `Customer`, and `BillReceipt`.
- **Complexity:** $O(1)$ booking and checkout lookups, $O(n)$ search filtering, $O(m)$ invoice aggregation.
- **Code Standards:** Component modularity, functional hooks, responsive layout, WCAG accessible color contrast.

### 6. Documentation / GitHub / Report Submission
- **GitHub Repository:** `kochechaitanya991-collab/Hotel-Management-System`
- **Author:** Chaitanya Koche (`kochechaitanya991@gmail.com`)
- **Full Report:** [`PROJECT_REPORT.md`](./PROJECT_REPORT.md)

---

## 🚀 Quick Start & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript lint verification
npm run lint

# Build for production
npm run build
```
Default server runs on `http://localhost:3000`.
