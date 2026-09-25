# 📚 College Notes Platform

A polished, modern, responsive web application prototype for a **college student notes platform** — where students discover, search, view, and download organized academic notes, and administrators exclusively manage all content.

> **Frontend prototype** built with mock data. Structured for a future Node.js + Express + MongoDB backend.

---

## ✨ Overview

College students often struggle to find reliable, well-organized study material scattered across chats and drives. The College Notes Platform provides a single, trustworthy, easy-to-navigate destination for semester-wise, subject-wise, and unit-wise notes — with a strict content model:

- **Students** can browse, search, filter, view, download, bookmark, and report notes.
- **Administrators** exclusively upload, edit, delete, publish/unpublish notes, and manage subjects and reports.
- **Students never see any upload/create/manage affordance**, anywhere in the interface.

---

## 🧱 Tech Stack

- **React** + **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React** (icons)
- **Framer Motion** (subtle animation)
- Mock data / mock service layer (swappable for a real REST API)

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The app runs at `http://localhost:5173` by default (Vite).

---

## 🗂️ Project Structure

```
src/
├── layouts/          # StudentLayout, AdminLayout
├── pages/
│   ├── student/       # Home, Notes, Subjects, NoteDetails, Search, Bookmarks, Login, Register, Profile
│   └── admin/          # AdminLogin, Dashboard, NotesManagement, UploadNote, EditNote, SubjectManagement, Reports, Settings
├── components/         # Shared UI (NoteCard, SearchBar, Modal, PDFViewer, …)
├── components/admin/   # Admin-only UI (AdminSidebar, NotesTable, UploadForm, …)
├── services/            # Mock service functions (getNotes, getSubjects, …)
├── data/                 # Mock datasets
├── context/              # AuthContext (student), AdminAuthContext (admin)
├── hooks/                # useNotes, useSubjects, useBookmarks, …
└── utils/                 # Formatters, constants
```

Full details in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## 🧭 Application Map

### Student
```
Home · Notes · Subjects · Note Details · Search · Bookmarks · Login · Register · Profile
```

### Admin (`/admin`)
```
Login · Dashboard · Notes · Upload Note · Edit Note · Subjects · Reports · Settings
```

---

## 🔐 Roles & Permissions

| Capability | Student | Admin |
|---|:---:|:---:|
| Browse / search / view / download notes | ✅ | ✅ |
| Bookmark / report notes | ✅ | — |
| Upload / edit / delete / publish notes | ❌ | ✅ |
| Manage subjects | ❌ | ✅ |
| Review reports | ❌ | ✅ |

> ⚠️ **Critical rule:** The student interface must never expose upload, create, edit, or delete controls for notes or subjects. This is enforced structurally — admin-only UI lives exclusively in dedicated admin components/pages, never conditionally rendered inside shared student components.

---

## 🎨 Design

A clean **academic SaaS/productivity** aesthetic — light gray + white foundation, a blue/indigo accent, dark charcoal text, minimal decoration, high readability. Full design tokens, component specs, and motion guidelines are documented in [`DESIGN.md`](./DESIGN.md).

---

## 🔌 Mock Data & Future Backend

The prototype uses mock service functions (`getNotes()`, `getNoteById()`, `getSubjects()`, `getBookmarks()`, etc.) backed by local mock datasets (20+ notes, 10+ subjects, 8 semesters, 5 students, 1 admin). These functions are designed to be swapped for real Axios calls to an Express REST API without any changes to hooks, pages, or components — see [`ARCHITECTURE.md`](./ARCHITECTURE.md#9-backend-integration-plan-future) for the planned API surface and migration steps.

```
React → Axios → Express REST API → MongoDB
```

---

## 📄 Documentation

| Document | Description |
|---|---|
| [`PRD.md`](./PRD.md) | Product requirements, user roles, functional & non-functional requirements |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Tech stack, project structure, data flow, routing, backend integration plan |
| [`DESIGN.md`](./DESIGN.md) | Design system — colors, typography, spacing, components, states, motion |
| [`LICENSE.md`](./LICENSE.md) | Project license |

---

## ✅ Status

This repository currently implements the **frontend prototype phase** — a complete, responsive UI built on mock data, ready to be wired to a real backend as described in `ARCHITECTURE.md`.

---

## 📝 License

Licensed under the [MIT License](./LICENSE.md).
