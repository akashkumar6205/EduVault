import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Bookmark,
  Search,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';

export function Navbar() {
  const { student, isAuthenticated, logout } = useAuth();
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Notes', to: '/notes' },
    { label: 'Subjects', to: '/subjects' },
    { label: 'Search', to: '/search' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:bg-primary-hover transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-text-primary group-hover:text-primary transition-colors">
                Eduvault
              </span>
              <span className="text-[10px] text-text-secondary -mt-1 font-medium hidden sm:inline">
                Academic Notes Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary-light font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-slate-100/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Auth Profile */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {/* Quick Search Shortcut */}
            <Link
              to="/search"
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors"
              title="Search notes"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors"
              title="Saved Bookmarks"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {isAuthenticated && bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Auth: User Menu or Login Button */}
            {isAuthenticated && student ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-border hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={student.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`}
                    alt={student.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div className="text-left hidden lg:block">
                    <span className="block text-xs font-semibold text-text-primary leading-tight truncate max-w-[110px]">
                      {student.name}
                    </span>
                    <span className="block text-[10px] text-text-secondary uppercase">
                      {student.branch} • Sem {student.semester}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-52 bg-surface rounded-xl shadow-modal border border-border py-1.5 z-30 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-semibold text-text-primary truncate">{student.name}</p>
                        <p className="text-[11px] text-text-secondary truncate">{student.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-text-primary hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-text-secondary" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-text-primary hover:bg-slate-50 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-text-secondary" />
                        <span>Saved Bookmarks ({bookmarks.length})</span>
                      </Link>
                      <div className="border-t border-border my-1" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-danger hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 text-danger" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-xs"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/bookmarks"
              className="relative p-2 text-text-secondary hover:text-text-primary"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {isAuthenticated && bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {bookmarks.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'text-primary bg-primary-light font-semibold'
                      : 'text-text-secondary hover:bg-slate-50 hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-border">
            {isAuthenticated && student ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
                  <img
                    src={student.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`}
                    alt={student.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{student.name}</p>
                    <p className="text-[10px] text-text-secondary">{student.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-text-primary hover:bg-slate-50 rounded-lg"
                >
                  My Student Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-danger hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-semibold border border-border text-text-primary rounded-lg hover:bg-slate-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover shadow-xs"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
