import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { RequireAdminAuth } from '../components/RequireAdminAuth';

export function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <RequireAdminAuth>
      <div className="min-h-screen bg-slate-50 flex text-text-primary antialiased">
        <AdminSidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminNavbar onToggleMobile={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAdminAuth>
  );
}
