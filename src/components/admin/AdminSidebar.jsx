import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Upload,
  BookOpen,
  Flag,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminSidebar({ mobileOpen, onClose }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Notes Catalog', to: '/admin/notes', icon: FileText, end: true },
    { label: 'Upload Note', to: '/admin/notes/upload', icon: Upload },
    { label: 'Subject Management', to: '/admin/subjects', icon: BookOpen },
    { label: 'Student Reports', to: '/admin/reports', icon: Flag },
    { label: 'Portal Settings', to: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-200">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight block leading-tight">
                Eduvault
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block">
                Coordinator Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Academic Operations
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Student Site Link & Admin Info */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>Open Student Site</span>
          </span>
          <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">Live</span>
        </Link>

        {admin && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={admin.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
                alt={admin.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{admin.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{admin.department}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Sign out of admin"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 border-r border-slate-800 shadow-sm z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
