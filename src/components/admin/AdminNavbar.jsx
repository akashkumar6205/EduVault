import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Plus, Bell, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminNavbar({ onToggleMobile }) {
  const { admin } = useAdminAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Coordinator Dashboard';
    if (path.includes('/admin/notes/upload')) return 'Upload New Material';
    if (path.includes('/admin/notes/') && path.includes('/edit')) return 'Edit Study Material';
    if (path.includes('/admin/notes')) return 'Notes Catalog & Publishing';
    if (path.includes('/admin/subjects')) return 'Subject Management';
    if (path.includes('/admin/reports')) return 'Student Incident Reports';
    if (path.includes('/admin/settings')) return 'Administrative Settings';
    return 'Admin Panel';
  };

  return (
    <header className="h-16 bg-surface border-b border-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base font-bold text-text-primary leading-tight">
            {getPageTitle()}
          </h2>
          <span className="text-[11px] text-text-muted hidden sm:inline">
            Administrative Role: Full CRUD & Moderation
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/reports"
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg relative transition-colors"
          title="Incident reports"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </Link>

        <Link
          to="/admin/notes/upload"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Note</span>
        </Link>
      </div>
    </header>
  );
}
