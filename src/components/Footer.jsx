import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart, BookOpen } from 'lucide-react';
import { BRANCHES } from '../utils/constants';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto text-text-secondary text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-text-primary">Eduvault</span>
            </Link>
            <p className="text-text-secondary text-xs leading-relaxed">
              Curated, peer-reviewed engineering course materials, handwritten unit notes, formula sheets, and university previous year question papers.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Moderated exclusively by academic coordinators</span>
            </div>
          </div>

          {/* Engineering Disciplines */}
          <div>
            <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-3">
              Departments
            </h4>
            <ul className="space-y-2">
              {BRANCHES.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link
                    to={`/notes?branch=${b.code}`}
                    className="hover:text-primary transition-colors text-xs"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-3">
              Student Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/notes" className="hover:text-primary transition-colors">
                  Notes Explorer
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-primary transition-colors">
                  Browse by Subject
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-primary transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary transition-colors">
                  Global Search
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  Student Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Semester Fast-Track & Admin Gateway */}
          <div>
            <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-3">
              Semesters
            </h4>
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <Link
                  key={s}
                  to={`/notes?semester=${s}`}
                  className="py-1 px-1.5 bg-slate-50 hover:bg-primary-light hover:text-primary border border-border rounded text-center text-[11px] font-medium transition-colors"
                >
                  Sem {s}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <span className="block text-[11px] text-text-muted mb-1">Administrative Gateway</span>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors"
              >
                <span>Coordinator Portal</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
          <p>© {new Date().getFullYear()} Eduvault College Notes Platform. All academic rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for engineering students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
