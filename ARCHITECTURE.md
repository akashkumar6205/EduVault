# Architecture Document
## College Notes Platform — Frontend Prototype

---

## 1. Purpose

This document describes the technical architecture of the College Notes Platform frontend prototype: the technology stack, project structure, component design, data flow, routing, and the plan for future backend integration.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Routing | React Router |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animation | Framer Motion |
| Data (prototype) | Mock JSON + mock service functions |
| Future backend | Node.js + Express + MongoDB |
| Future HTTP client | Axios |

Vite is used for fast dev-server startup and HMR. Tailwind provides a utility-first styling system that keeps the design system (spacing, color, typography tokens) centralized in `tailwind.config.js`. Framer Motion is used sparingly for page transitions, hover states, and modal/drawer entrances — not as a core dependency of any functional flow, so it can be removed without breaking functionality.

---

## 3. High-Level System Design

```
┌─────────────────────────────┐
│         React App           │
│  ┌────────────┬───────────┐ │
│  │  Student    │  Admin    │ │
│  │  Routes     │  Routes   │ │
│  └─────┬───────┴─────┬─────┘ │
│        │             │       │
│  ┌─────▼─────────────▼─────┐ │
│  │     Shared Components    │ │
│  │  (Navbar, Modal, Cards…) │ │
│  └─────────────┬────────────┘ │
│                │              │
│  ┌─────────────▼────────────┐ │
│  │     Service Layer         │ │
│  │ getNotes(), getSubjects() │ │
│  └─────────────┬────────────┘ │
│                │              │
│  ┌─────────────▼────────────┐ │
│  │   Mock Data (JSON/JS)     │ │
│  │  (future: Axios → REST)   │ │
│  └────────────────────────── ┘ │
└──────────────────────────────┘
```

The application is split into two isolated experiences — **Student** and **Admin** — that share a common component library and design system but never share navigation, layout shells, or route guards. This separation is intentional and enforced structurally (separate route trees, separate layout wrappers) so that admin-only capabilities cannot leak into the student UI by accident.

---

## 4. Project Structure

```
college-notes-platform/
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── router.jsx
│   │
│   ├── layouts/
│   │   ├── StudentLayout.jsx        # Navbar + Footer shell
│   │   └── AdminLayout.jsx          # AdminSidebar + AdminNavbar shell
│   │
│   ├── pages/
│   │   ├── student/
│   │   │   ├── Home.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── NoteDetails.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── Dashboard.jsx
│   │       ├── NotesManagement.jsx
│   │       ├── UploadNote.jsx
│   │       ├── EditNote.jsx
│   │       ├── SubjectManagement.jsx
│   │       ├── Reports.jsx
│   │       └── Settings.jsx
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteGrid.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── SemesterCard.jsx
│   │   ├── SubjectCard.jsx
│   │   ├── BookmarkButton.jsx
│   │   ├── DownloadButton.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── StatusBadge.jsx
│   │   └── PDFViewer.jsx
│   │
│   ├── components/admin/
│   │   ├── AdminSidebar.jsx
│   │   ├── AdminNavbar.jsx
│   │   ├── StatCard.jsx
│   │   ├── NotesTable.jsx
│   │   ├── UploadForm.jsx
│   │   ├── ReportTable.jsx
│   │   ├── SubjectTable.jsx
│   │   └── AdminModal.jsx
│   │
│   ├── services/
│   │   ├── notesService.js          # getNotes, getNoteById, createNote…
│   │   ├── subjectsService.js       # getSubjects, createSubject…
│   │   ├── bookmarksService.js      # getBookmarks, addBookmark…
│   │   ├── reportsService.js        # getReports, submitReport…
│   │   └── authService.js           # login, register, adminLogin…
│   │
│   ├── data/
│   │   ├── mockNotes.js
│   │   ├── mockSubjects.js
│   │   ├── mockUsers.js
│   │   └── mockReports.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          # student session
│   │   └── AdminAuthContext.jsx     # admin session (isolated)
│   │
│   ├── hooks/
│   │   ├── useNotes.js
│   │   ├── useSubjects.js
│   │   ├── useBookmarks.js
│   │   └── useDebouncedSearch.js
│   │
│   └── utils/
│       ├── formatters.js            # file size, date formatting
│       └── constants.js             # branches, semesters, units, statuses
│
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 5. Routing

```
/                          → Student Home
/notes                     → Notes Explorer
/notes/:id                 → Note Details
/subjects                  → Subjects
/subjects/:id              → Subject → filtered notes
/search                    → Search results
/bookmarks                 → Bookmarks (auth required)
/login                     → Student Login
/register                  → Student Register
/profile                   → Student Profile (auth required)

/admin/login                → Admin Login
/admin                      → Admin Dashboard (auth required, admin role)
/admin/notes                → Notes Management
/admin/notes/upload         → Upload Note
/admin/notes/:id/edit       → Edit Note
/admin/subjects             → Subject Management
/admin/reports              → Reports
/admin/settings             → Settings
```

Route guards:
- `RequireStudentAuth` wraps `/bookmarks` and `/profile`.
- `RequireAdminAuth` wraps every `/admin/*` route except `/admin/login`, and redirects to `/admin/login` if no valid admin session exists.
- The two auth contexts (`AuthContext`, `AdminAuthContext`) are intentionally separate so a student session can never satisfy an admin route guard.

---

## 6. Component Design Principles

- **Presentational vs. container split:** Page components (`pages/`) fetch data via hooks/services and pass it down; components in `components/` are largely presentational and reusable across student pages (e.g., `NoteCard` is used on Home, Notes, Search, Bookmarks).
- **Composition over duplication:** `UploadForm` is reused by both `UploadNote.jsx` and `EditNote.jsx`, pre-populated via props in the edit case.
- **Consistent states:** Every data-driven component supports three states — loading (`LoadingSkeleton`), empty (`EmptyState`), and error — plus the populated state, so no page ever renders a blank screen.
- **Status/role isolation:** No shared component ever renders an "upload" or "manage" affordance conditionally based on role. Admin-only actions exist exclusively inside `components/admin/` and admin pages — they are not toggled on/off inside shared student components. This structurally prevents upload/edit/delete UI from ever appearing in the student experience.

---

## 7. Data Layer & Mock Services

For the prototype, `services/*.js` functions read from local mock data (`data/*.js`) and return Promises (with simulated latency) to mimic real API calls:

```javascript
// services/notesService.js
export async function getNotes(filters = {}) {
  await simulateDelay();
  return applyFilters(mockNotes, filters);
}

export async function getNoteById(id) {
  await simulateDelay();
  return mockNotes.find(n => n.id === id) ?? null;
}
```

Pages and hooks call these service functions exclusively — never the mock data files directly. This indirection is the seam where a real backend will be plugged in later (see Section 9).

### Mock Data Shape

```javascript
{
  id: 1,
  title: "Data Structures - Unit 1",
  subject: "Data Structures",
  branch: "CSE",
  semester: 3,
  unit: 1,
  type: "Notes",
  fileSize: "2.4 MB",
  uploadDate: "2026-08-14",
  downloads: 245,
  status: "published" // "published" | "draft" | "archived"
}
```

Minimum dataset per PRD: 20 notes, 10 subjects, 8 semesters, 5 students, 1 admin.

---

## 8. State Management

- **Local/UI state:** `useState`/`useReducer` within components (filters, modals, form state).
- **Server-shaped state:** Custom hooks (`useNotes`, `useSubjects`, `useBookmarks`) wrap service calls and expose `{ data, isLoading, error }`.
- **Auth state:** React Context (`AuthContext` for students, `AdminAuthContext` for admins), each independently persisted (e.g., to memory/sessionStorage in the prototype) and independently checked by route guards.
- No global state library (Redux/Zustand) is required at this scale; Context + hooks is sufficient and keeps the codebase approachable.

---

## 9. Backend Integration Plan (Future)

```
React Components
      ↓
Custom Hooks (useNotes, useSubjects, …)
      ↓
Service Layer (notesService.js, …)     ← swap implementation here
      ↓
Axios → Express REST API → MongoDB
```

When the real backend is ready:
1. Replace the body of each function in `services/*.js` with an Axios call to the corresponding REST endpoint (e.g., `getNotes()` → `GET /api/notes`).
2. Remove `data/*.js` mock files.
3. No changes are required in hooks, pages, or components, since they depend only on the service layer's function signatures and return shapes.
4. Add real JWT-based auth in `authService.js`; `AuthContext`/`AdminAuthContext` already model separate sessions and require no structural change.
5. Enforce role-based authorization **server-side** (students: read-only; admins: full CRUD + publish) — the frontend's route guards and hidden UI are a UX convenience only and are not a substitute for server-side checks.

Suggested REST surface for the future Express API:

```
GET    /api/notes
GET    /api/notes/:id
POST   /api/notes              (admin only)
PUT    /api/notes/:id          (admin only)
DELETE /api/notes/:id          (admin only)
PATCH  /api/notes/:id/status   (admin only, publish/unpublish)

GET    /api/subjects
POST   /api/subjects           (admin only)
PUT    /api/subjects/:id       (admin only)
DELETE /api/subjects/:id       (admin only)

GET    /api/bookmarks          (student)
POST   /api/bookmarks          (student)
DELETE /api/bookmarks/:id      (student)

GET    /api/reports            (admin only)
POST   /api/reports            (student)
PATCH  /api/reports/:id        (admin only)

POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/admin/login
```

---

## 10. Responsive Strategy

- Tailwind's breakpoint system (`sm`, `md`, `lg`, `xl`) drives all layout switches.
- Desktop: sidebars, multi-column grids, full data tables.
- Tablet: reduced grid columns, condensed sidebar.
- Mobile: hamburger nav / bottom navigation, single-column cards, filters presented in a bottom-sheet `Modal` variant, tables replaced by stacked card summaries where appropriate.
- Each page defines its own mobile layout intentionally (per component), rather than relying purely on CSS reflow of the desktop markup.

---

## 11. Animation Strategy (Framer Motion)

Used only for: page/route transitions, card hover/tap states, modal and drawer entrance/exit, sidebar open/close, search results fade/stagger-in, upload progress bar, and dashboard stat-card count-up. Kept subtle and fast (150–300ms) to preserve a professional, fast-feeling UI rather than a decorative one.

---

## 12. Testing & Quality Considerations (Prototype Scope)

- Manual responsive QA at common breakpoints (mobile ~375px, tablet ~768px, desktop ~1280px+).
- Manual verification that no upload/create/manage affordance is reachable from any student-facing route.
- Component-level accessibility checks: focus states, contrast, semantic landmarks, alt text on icons/images.
