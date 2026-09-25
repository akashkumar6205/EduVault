import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

export function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
