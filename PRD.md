# Product Requirements Document (PRD)
## College Notes Platform

**Version:** 1.0
**Status:** Draft — Frontend Prototype Phase
**Owner:** Product / Design / Engineering

---

## 1. Overview

The College Notes Platform is a centralized web application that allows college students to **discover, search, view, and download** organized academic study material (semester-wise, subject-wise, unit-wise). Content is exclusively curated and published by **administrators** — students have read-only access to notes and can never upload, edit, or delete content.

This document defines the product scope, user roles, functional requirements, and success criteria for the initial frontend prototype, with a structure that supports a future Node.js + Express + MongoDB backend.

---

## 2. Problem Statement

College students commonly struggle to find reliable, well-organized study material. Notes are scattered across WhatsApp groups, Google Drive folders, and personal collections, with no consistent structure, no verification of quality, and no easy way to browse by semester, subject, or unit.

**Goal:** Provide a single, trustworthy, easy-to-navigate destination for academic notes, moderated entirely by administrators to guarantee quality and consistency.

---

## 3. Goals & Non-Goals

### 3.1 Goals
- Give students a fast, structured way to find notes by branch, semester, subject, and unit.
- Provide a clean note-viewing and downloading experience (PDF-first).
- Let students bookmark notes and report incorrect/broken content.
- Give administrators full control over content lifecycle (upload, edit, publish/unpublish, delete).
- Establish a component architecture and mock data layer that can be swapped for a real REST API without UI rewrites.

### 3.2 Non-Goals (for this phase)
- No real backend/persistence — mock data and mock service functions only.
- No payment, subscription, or monetization features.
- No peer-to-peer note uploading, ratings/reviews, or social features.
- No real-time collaboration or note annotation.
- No native mobile app (responsive web only).

---

## 4. User Roles & Permissions

| Capability | Student | Admin |
|---|---|---|
| Browse / search / filter notes | ✅ | ✅ |
| View note details & PDF preview | ✅ | ✅ |
| Download notes | ✅ | ✅ |
| Bookmark notes | ✅ | ❌ (not applicable) |
| Report a note | ✅ | ❌ (not applicable) |
| Upload notes | ❌ | ✅ |
| Edit / delete notes | ❌ | ✅ |
| Publish / unpublish notes | ❌ | ✅ |
| Manage subjects | ❌ | ✅ |
| Review & resolve reports | ❌ | ✅ |
| View platform-wide statistics | ❌ | ✅ |

**Critical rule:** The student interface must never expose upload, create, edit, or delete affordances for notes, subjects, or any admin-only capability — not in the navbar, not in empty states, not in any UI copy.

---

## 5. User Personas

**1. Priya — 2nd Year CSE Student**
Wants to quickly find Unit 3 notes for Data Structures before an exam. Values speed, clear organization by semester/subject/unit, and the ability to bookmark notes for later.

**2. Rahul — 3rd Year Student, Infrequent User**
Discovers the platform via search. Needs an intuitive search experience that surfaces the right subject/semester/unit without prior familiarity with the site.

**3. Admin — Academic Coordinator**
Uploads and maintains notes for their department. Needs an efficient upload form, a searchable notes table, and visibility into student-reported issues.

---

## 6. Functional Requirements

### 6.1 Student Application

| ID | Feature | Requirement |
|---|---|---|
| FR-1 | Home | Hero section with search bar, browse-by-semester cards, popular subjects grid, recently added notes grid. |
| FR-2 | Notes Explorer (`/notes`) | Filterable, searchable grid of all published notes (branch, semester, subject, unit, type). |
| FR-3 | Search | Global search across notes, subjects, and units with result counts and matched metadata. |
| FR-4 | Note Details (`/notes/:id`) | Full metadata, description, PDF preview, view/download/bookmark/report actions, related notes. |
| FR-5 | PDF Viewer | In-app mock PDF preview with download and bookmark actions, desktop and mobile layouts. |
| FR-6 | Bookmarks (`/bookmarks`) | List of saved notes with remove/view actions and an empty state. |
| FR-7 | Profile | Account info, saved notes, recently viewed notes, logout. |
| FR-8 | Auth (Login/Register) | Email/password login; registration collects name, email, password, college, branch, semester. No role selector — all self-registered users are `student`. |
| FR-9 | Report Note | Modal with reason selection (wrong subject, wrong unit, incorrect content, file doesn't open, duplicate, other) + free-text field. |

### 6.2 Admin Panel (`/admin`)

| ID | Feature | Requirement |
|---|---|---|
| FR-10 | Admin Login | Separate authenticated entry point, isolated from student login. |
| FR-11 | Dashboard | Stat cards (total notes, total students, total downloads, pending reports), recent uploads, popular notes, recent reports. |
| FR-12 | Notes Management | Searchable/filterable table with view/edit/delete/publish/unpublish actions and status badges (Published, Draft, Archived). |
| FR-13 | Upload Note | Form with title, description, branch, semester, subject, unit, type, drag-and-drop PDF upload, progress UI, success confirmation. |
| FR-14 | Edit Note | Same form pre-populated; supports replacing the PDF and changing status. |
| FR-15 | Subject Management | Add/edit/delete subjects; table of subject, branch, semester, note count, status. |
| FR-16 | Reports | Table of reported notes (note, reporter, reason, date, status) with view/resolve/delete actions. |
| FR-17 | Settings | Placeholder admin account/settings page. |

### 6.3 Cross-Cutting Requirements

| ID | Requirement |
|---|---|
| FR-18 | Empty states for: no notes found, no bookmarks, no search results, no reports, no recent notes. |
| FR-19 | Skeleton loading states for note cards, dashboard cards, tables, subject cards, search results. |
| FR-20 | Friendly error states with retry actions for data-load and upload failures. |
| FR-21 | Fully responsive layouts for desktop, tablet, and mobile — mobile is intentionally designed, not a shrunk desktop view. |

---

## 7. Non-Functional Requirements

- **Performance:** Perceived load should feel instant via skeleton loaders; no blank-screen states.
- **Accessibility:** Sufficient color contrast, visible focus states, keyboard-navigable controls, semantic HTML.
- **Consistency:** A single design system (spacing, typography, color, component variants) applied across student and admin experiences.
- **Maintainability:** Clear component boundaries (see ARCHITECTURE.md) so mock data services can later be replaced by real API calls with no UI-layer changes.
- **Security posture (future backend):** Role-based authorization must be enforced server-side — students limited to read operations; admins have full CRUD + publish rights. The frontend's hiding of admin UI from students is a UX convenience, not a security boundary, and must be backed by real server-side checks once the backend is connected.

---

## 8. Information Architecture

**Student:** Home · Notes · Subjects · Note Details · Search · Bookmarks · Login · Register · Profile

**Admin:** Login · Dashboard · Notes · Upload Note · Edit Note · Subjects · Reports · Settings

---

## 9. Success Metrics (Prototype Phase)

- All student and admin flows in Section 32 of the source spec (Home → Search → Filter → Note Details → PDF Viewer → Download/Bookmark; Admin Login → Dashboard → Upload → Metadata → PDF → Publish → visible to students) are demonstrable end-to-end with mock data.
- Zero instances of upload/create/manage affordances visible anywhere in the student interface.
- All primary pages have working loading, empty, and error states.
- Layouts pass manual responsive checks at common desktop, tablet, and mobile breakpoints.

---

## 10. Assumptions & Constraints

- No real backend in this phase; all data is served via mock service functions (`getNotes()`, `getNoteById()`, `getSubjects()`, `getBookmarks()`, etc.).
- Minimum realistic mock dataset: 20 notes, 10 subjects, 8 semesters, 5 students, 1 admin.
- PDF viewing is simulated with a mock preview component; real PDF rendering is deferred to backend integration.

---

## 11. Future Scope (Post-Prototype)

- Real Express + MongoDB backend with JWT-based auth and server-enforced RBAC.
- Real PDF storage/streaming (e.g., S3-compatible storage) and a real PDF.js-based viewer.
- Admin analytics (download trends, most-reported subjects).
- Email notifications for report resolution.
- Possible future addition of note ratings/quality signals — subject to a separate PRD revision.

---

## 12. Out of Scope Risks / Open Questions

- Should students be able to request a subject/unit that doesn't yet exist? (Not in current scope — flag for future discussion.)
- Multi-college/multi-institution support is not addressed in this version.
- No decision yet on file-size limits or storage quotas for admin uploads beyond UI copy ("Maximum file size", "Supported format: PDF").
