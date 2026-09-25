import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Student Pages
import { Home } from './pages/student/Home';
import { Notes } from './pages/student/Notes';
import { NoteDetails } from './pages/student/NoteDetails';
import { Subjects } from './pages/student/Subjects';
import { SearchPage } from './pages/student/Search';
import { Bookmarks } from './pages/student/Bookmarks';
import { Login } from './pages/student/Login';
import { Register } from './pages/student/Register';
import { Profile } from './pages/student/Profile';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { NotesManagement } from './pages/admin/NotesManagement';
import { UploadNote } from './pages/admin/UploadNote';
import { EditNote } from './pages/admin/EditNote';
import { SubjectManagement } from './pages/admin/SubjectManagement';
import { Reports } from './pages/admin/Reports';
import { Settings } from './pages/admin/Settings';

// Route Guards
import { RequireStudentAuth } from './components/RequireStudentAuth';

export const router = createBrowserRouter([
  // Student Route Tree
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'notes', element: <Notes /> },
      { path: 'notes/:id', element: <NoteDetails /> },
      { path: 'subjects', element: <Subjects /> },
      { path: 'search', element: <SearchPage /> },
      {
        path: 'bookmarks',
        element: (
          <RequireStudentAuth>
            <Bookmarks />
          </RequireStudentAuth>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'profile',
        element: (
          <RequireStudentAuth>
            <Profile />
          </RequireStudentAuth>
        ),
      },
    ],
  },

  // Admin Login (isolated entry point outside AdminLayout)
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  // Admin Panel Route Tree (enclosed in AdminLayout with RequireAdminAuth)
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'notes', element: <NotesManagement /> },
      { path: 'notes/upload', element: <UploadNote /> },
      { path: 'notes/:id/edit', element: <EditNote /> },
      { path: 'subjects', element: <SubjectManagement /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <Settings /> },
    ],
  },

  // Fallback redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
