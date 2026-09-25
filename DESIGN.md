# Design System
## College Notes Platform

---

## 1. Design Principles

The platform should feel like a **modern academic SaaS/productivity dashboard** — clean, minimal, professional, student-friendly, trustworthy, fast, and easy to navigate.

Guiding rules:
- Readability and usability over decoration.
- Avoid excessive gradients, glassmorphism, or ornamental effects.
- Consistent spacing, typography, and component behavior across every page.
- Every interactive element has a clear hover and focus state.
- Every data view has a loading, empty, and error state — never a blank screen.

---

## 2. Color Palette

| Token | Usage | Suggested Value |
|---|---|---|
| `background` | Page background | Very light gray (`#F7F8FA` – `#F9FAFB`) |
| `surface` | Cards, panels, modals | White (`#FFFFFF`) |
| `primary` | Buttons, links, active states, accents | Blue/Indigo (`#4F46E5` – `#4338CA`) |
| `primary-hover` | Primary hover state | Slightly darker indigo |
| `text-primary` | Headings, body text | Dark charcoal (`#1F2937`) |
| `text-secondary` | Metadata, captions, helper text | Gray (`#6B7280`) |
| `border` | Card borders, dividers, input borders | Light gray (`#E5E7EB`) |
| `success` | Published status, success toasts | Green (`#16A34A`) |
| `warning` | Draft status, pending reports | Amber (`#D97706`) |
| `error` | Errors, destructive actions, rejected reports | Red (`#DC2626`) |

Usage notes:
- Primary color is used sparingly — for CTAs, active nav items, links, and key icons — not as large background fills.
- Status badges (`Published` / `Draft` / `Archived`) map to `success` / `warning` / `text-secondary` respectively; report statuses map similarly (`Resolved` = success, `Pending` = warning).
- Maintain WCAG AA contrast for all text-on-background and text-on-surface combinations.

---

## 3. Typography

| Role | Example | Weight | Notes |
|---|---|---|---|
| Display / Hero H1 | "Your College Notes, Organized in One Place." | Bold (700) | Large, tight line-height, used once per page max |
| Page H2 | "Recently Added Notes", "Notes Explorer" | Semibold (600) | Section headers |
| Card Title | Note title, subject name | Semibold (600) | Truncate gracefully with ellipsis on overflow |
| Body | Descriptions, paragraph copy | Regular (400) | `text-primary`, comfortable line-height (1.5–1.6) |
| Caption / Metadata | File size, upload date, semester/unit tags | Regular/Medium (400–500), smaller size | `text-secondary` |
| Button Label | All button text | Medium/Semibold (500–600) | Sentence case, not all-caps |

Use a single clean sans-serif system font stack (e.g., Inter or system-ui) for a fast, professional feel — avoid decorative or multiple display fonts.

---

## 4. Spacing & Layout System

- Base spacing unit: **4px**, scaled via Tailwind's default spacing scale (4, 8, 12, 16, 24, 32, 48, 64...).
- Card padding: 16–24px depending on card density (note cards tighter, dashboard/admin cards more generous).
- Section vertical rhythm: 48–80px between major homepage sections.
- Grid gutters: 16–24px between cards in a grid.
- Max content width: constrained (e.g., `max-w-7xl`) and centered, with responsive horizontal padding.

### Grid Behavior
| Breakpoint | Note/Subject Grid Columns |
|---|---|
| Mobile (<640px) | 1 column |
| Tablet (640–1024px) | 2 columns |
| Desktop (1024–1280px) | 3 columns |
| Large desktop (>1280px) | 4 columns |

---

## 5. Component Design Specs

### 5.1 Buttons
- **Primary:** Filled, `primary` background, white text, rounded corners (e.g., `rounded-lg`), subtle shadow on hover, slight scale/darken on hover (Framer Motion), clear focus ring.
- **Secondary/Outline:** White background, `border` outline, `text-primary` label, fills lightly on hover.
- **Destructive:** Red text or red fill for delete actions, always paired with a confirmation step.
- **Icon buttons** (bookmark, download): circular or rounded-square hit area ≥40px for touch accessibility.

### 5.2 Cards (Note / Subject / Semester)
- White surface, `border` outline or soft shadow, `rounded-xl` corners.
- Consistent internal layout: icon/thumbnail → title → metadata row → action row.
- Hover: subtle lift (`translateY(-2px)`) + shadow increase, fast transition (~150ms).
- Note card action row: `[View] [Download]` buttons + bookmark toggle icon aligned right, per spec example:
  ```
  Data Structures — Unit 1
  Data Structures · Semester 3 · Unit 1
  PDF • 2.4 MB
  [View] [Download]        ♡
  ```

### 5.3 Status Badges
Small pill-shaped labels, colored background tint + matching text color:
- **Published** → success tint
- **Draft** → warning tint
- **Archived** → neutral gray tint

### 5.4 Search Bar
- Large, prominent on the homepage hero (per spec: "Search notes, subjects, units...").
- Compact version in navbar/notes explorer.
- Icon-prefixed, rounded, clear focus state (ring in `primary`).

### 5.5 Filters (Notes Explorer)
- Desktop: persistent left sidebar (`FilterSidebar`) with grouped filters (Branch, Semester, Subject, Unit, Type).
- Mobile: a "Filters" button opens a bottom-sheet/drawer (`Modal` variant) containing the same filter groups, with an "Apply" and "Clear Filters" action.

### 5.6 Modals
- Centered on desktop, bottom-sheet style on mobile.
- Dimmed backdrop, entrance/exit animation via Framer Motion (fade + slight scale/slide).
- Used for: report submission, drag-and-drop upload confirmation dialogs, filter drawer (mobile), delete confirmations.

### 5.7 Tables (Admin)
- Desktop: standard data table with sortable/searchable header, row hover highlight, right-aligned action icons.
- Mobile: tables collapse into stacked summary cards (title + key fields + an actions menu), never a horizontally-scrolling cramped table as the only mobile solution.

### 5.8 PDF Viewer
- Desktop: header bar (title + Download + Bookmark) above a large preview pane.
- Mobile: simplified single-column viewer with a sticky action bar at the bottom (Download/Bookmark) for easy thumb access.

---

## 6. States

### 6.1 Loading (Skeletons)
Gray, softly pulsing placeholder blocks matching the shape of the real content (card outlines, table rows, stat card outlines) — never a spinner-only blank page for primary content areas.

### 6.2 Empty States
Centered icon + short headline + one-line supporting copy + a clear next action (e.g., "Browse Notes"). Example:
```
No bookmarks yet.
Save important notes here so you can quickly access them later.
[Browse Notes]
```

### 6.3 Error States
Friendly, non-technical language + a retry action:
```
Something went wrong.
We couldn't load the notes.
[Try Again]
```

### 6.4 Success States
Inline confirmation banners/toasts with the `success` color and a check icon, e.g., "✓ Note uploaded successfully."

---

## 7. Iconography

- **Lucide React** icon set throughout, used at consistent sizes (16px for inline/metadata icons, 20–24px for buttons, 32–40px for feature/empty-state icons).
- Icons always paired with visible text labels for primary actions (icons are never the sole means of understanding an action, for accessibility).

---

## 8. Motion Guidelines

| Interaction | Motion |
|---|---|
| Page/route transition | Fade + slight vertical slide, ~200ms |
| Card hover | Lift + shadow, ~150ms |
| Button hover/tap | Scale 0.98–1.02, ~100–150ms |
| Modal/drawer entrance | Fade + scale/slide, ~200–250ms |
| Sidebar (mobile drawer) | Slide-in from edge, ~250ms |
| Search results appearing | Staggered fade-in per result, ~50ms stagger |
| Upload progress | Smooth width animation on progress bar |
| Dashboard stat cards | Count-up animation on mount |

Motion should always be subtle and purposeful — reinforcing state changes, never distracting from content.

---

## 9. Accessibility Standards

- Minimum AA contrast ratio for all text.
- Visible focus rings (not removed via `outline: none` without a replacement) on all interactive elements.
- All form inputs have associated labels.
- All icon-only controls have `aria-label`s.
- Modals trap focus and are dismissible via `Esc` and an explicit close control.
- Touch targets ≥40px on mobile.
- Semantic HTML landmarks (`nav`, `main`, `header`, `footer`) used throughout for screen-reader navigation.

---

## 10. Content & Tone Guidelines

- Use realistic, specific academic content (real-sounding subject names, unit numbers, file sizes) instead of Lorem Ipsum.
- Error and empty-state copy should be calm, human, and action-oriented — never technical stack traces or blame-the-user language.
- Admin-facing copy is efficient and direct (table labels, form labels); student-facing copy is slightly warmer and more encouraging (hero copy, empty states).
