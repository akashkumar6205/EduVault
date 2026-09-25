# Walkthrough — College Notes Platform (Eduvault)

The **College Notes Platform (Eduvault)** has been built from scratch according to the specifications in [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), and [`DESIGN.md`](./DESIGN.md).

---

## 🚀 How to Run the Application

```bash
# 1. Start the Vite development server
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview
```

The application runs at `http://localhost:5173`.

---

## 🌟 What Was Built

### 1. Project Foundation & Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design tokens (`bg: #F8F9FA`, `surface: #FFFFFF`, `primary: #4F46E5`, `success: #16A34A`, `warning: #D97706`, `danger: #DC2626`)
- **Typography & Icons**: Inter sans-serif stack and Lucide React icons
- **Animations**: Framer Motion for modals and smooth transitions
- **Routing**: React Router v6 with separated Student and Admin route trees

### 2. Mock Datasets & Resilient Service Layer
- **Realistic Data**:
  - `mockNotes.js`: 24 detailed engineering study materials across CSE, ECE, MECH, CIVIL, EEE (semesters 1–8, units 1–5, types: Handwritten Notes, Lecture Slides, Formula Sheets, PYQ, Lab Manuals; statuses: published, draft, archived).
  - `mockSubjects.js`: 12 engineering subjects across all semesters with curriculum descriptions and codes.
  - `mockUsers.js`: 5 students with pre-configured bookmarks and history, plus 1 academic coordinator admin.
  - `mockReports.js`: realistic student reports with reasons, dates, and statuses.
- **Service Layer**:
  - `notesService.js`: simulated async CRUD, status publishing, search, multi-criteria filtering, download incrementing, and localStorage persistence.
  - `subjectsService.js`: async subject CRUD.
  - `bookmarksService.js`: per-student bookmark toggling and retrieval.
  - `reportsService.js`: student report filing, resolution, and dismissal.
  - `authService.js`: independent student and admin authentication sessions.

### 3. Student Experience (`/`)
- **Homepage (`/`)**:
  - Hero search bar with keyboard shortcuts and department pills.
  - Quality signal badges (Faculty curated, unit indexing, in-app PDF preview).
  - Semester selector cards (Semesters 1 through 8).
  - Popular subjects grid and recently added study materials.
- **Notes Explorer (`/notes`)**:
  - Sticky desktop sidebar with branch, semester, unit, subject, and type filters.
  - Mobile bottom-sheet modal filter drawer.
  - Search within results, sorting (Newest, Most Downloaded, Unit), and pagination.
  - URL query synchronization (`?branch=CSE&semester=3`).
- **Subject Catalog (`/subjects`)**:
  - Filterable by department and semester with direct click-through to filtered notes.
- **Note Details & Reader (`/notes/:id`)**:
  - Metadata breakdown (Instructor, file size, pages, verified date, total downloads, tags).
  - **In-App PDF Viewer**: Top toolbar (page navigation, zoom in/out, fit width, fullscreen toggle, quick download, and bookmark) + simulated multi-page academic canvas + sticky mobile action bar.
  - Related study materials from the same subject.
  - **Report Note Modal**: Reason selection (wrong subject, wrong unit, inaccurate content, corrupt file, duplicate) with description field.
- **Global Search (`/search`)**:
  - Live debounced search querying across notes, subjects, and units with match counts.
- **Bookmarks (`/bookmarks`)**:
  - Authenticated student collection with empty state and quick removal/view actions.
- **Student Auth (`/login`, `/register`, `/profile`)**:
  - Login with 1-click demo student selector (Priya, Rahul, Ananya).
  - Registration with college, branch, and semester selection (strictly `student` role).
  - Profile page with academic details editing, saved materials, and sign out.

### 4. Admin Portal (`/admin`)
- **Authentication (`/admin/login`)**:
  - Dedicated admin entrance isolated from the student login.
  - Protected with `RequireAdminAuth` guard.
- **Coordinator Dashboard (`/admin`)**:
  - Stat cards: Total Published Notes, Active Students, Cumulative Downloads, Pending Reports.
  - Recent uploads table with inline Publish/Unpublish toggle.
  - Top 5 most downloaded notes ranking.
  - Pending student reports with quick-resolve action.
- **Notes Management (`/admin/notes`)**:
  - Filter tabs: All, Published, Draft, Archived.
  - Branch and keyword filters.
  - Status toggle, edit route, and delete with confirmation modal.
- **Upload & Edit Notes (`/admin/notes/upload`, `/admin/notes/:id/edit`)**:
  - Full syllabus classification form.
  - Drag-and-drop PDF dropzone with simulated verification progress bar.
  - Publish immediately vs. Save as Draft toggle.
- **Subject Management (`/admin/subjects`)**:
  - Data table with Add, Edit, and Delete subject modal dialogs.
- **Student Reports (`/admin/reports`)**:
  - Inspect reported issues, view student notes, write resolution messages, or dismiss.
- **Settings (`/admin/settings`)**:
  - Admin profile, architecture seam explanation, and 1-click local prototype reset button.

---

## 🔒 Role Separation Verification

| Checkpoint | Verified State |
|---|---|
| Student Navbar & Footer | **Zero** upload, edit, or manage buttons. Clean academic design. |
| Student Note Cards & Details | Only View, Download, Bookmark, and Report actions. |
| Route Guard Isolation | `RequireAdminAuth` redirects unauthenticated users from `/admin/*` to `/admin/login`. |
| Student Registration | Self-registration assigns the `student` role only — no role picker. |
| Admin Gateway | Discreetly located in the footer for coordinators. |

---

## 📦 Build Verification

`npm run build` executed and passed with code 0:
- Bundle: `dist/index.html` (0.94 kB)
- Styles: `dist/assets/index-CEmDwWB3.css` (37.15 kB)
- Scripts: `dist/assets/index-C2pDPaP8.js` (563.94 kB)

---

## 🛠️ Notes Section Separate Scroll Panes
- **Problem**: When browsing notes in `/notes`, scrolling through the notes data grid caused the filter sidebar to move and scroll with the entire page.
- **Solution**:
  - Implemented an independent two-pane desktop split layout in [`src/pages/student/Notes.jsx`](./src/pages/student/Notes.jsx):
    1. **Left Filter Pane**: Locked at `w-72 shrink-0 h-full` using [`src/components/FilterSidebar.jsx`](./src/components/FilterSidebar.jsx) with `h-full overflow-y-auto overscroll-contain`.
    2. **Right Notes Data Pane**: Isolated in its own scroll container with `flex-1 min-w-0 h-full md:overflow-y-auto md:pr-3 md:pb-6 overscroll-contain`.
  - **Result**: Scrolling over the notes cards now scrolls **only** the notes data, while the filter sidebar remains completely stationary on the left. Scrolling over the filter options scrolls only the filters. Both areas operate as separate, independent scroll panes.


