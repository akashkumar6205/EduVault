import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Building,
  Mail,
  Bookmark,
  LogOut,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { NoteCard } from '../../components/NoteCard';
import { EmptyState } from '../../components/EmptyState';
import { BRANCHES, SEMESTERS } from '../../utils/constants';

export function Profile() {
  const { student, logout, updateProfile } = useAuth();
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    college: student?.college || '',
    branch: student?.branch || 'CSE',
    semester: student?.semester || 3,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!student) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Overview Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={student.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`}
            alt={student.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                {student.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Student
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>{student.email}</span>
            </p>
            <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
              <Building className="w-3.5 h-3.5" />
              <span>{student.college}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-border bg-white text-xs font-semibold text-text-primary hover:bg-slate-50 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Academic Details'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-50 text-danger text-xs font-semibold hover:bg-red-100 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile updated successfully.</span>
        </div>
      )}

      {/* Edit Form Modal/Drawer */}
      {isEditing && (
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs animate-in fade-in">
          <h3 className="text-sm font-bold text-text-primary mb-4">Edit Academic Information</h3>
          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                College / Institution
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full bg-white border border-border rounded-lg text-xs p-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Branch
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full bg-white border border-border rounded-lg text-xs p-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.code}>{b.code}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full bg-white border border-border rounded-lg text-xs p-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {SEMESTERS.map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Academic Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-text-secondary">Enrolled Branch</span>
            <h4 className="text-base font-bold text-text-primary">{student.branch}</h4>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-text-secondary">Current Term</span>
            <h4 className="text-base font-bold text-text-primary">Semester {student.semester}</h4>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-text-secondary">Saved Bookmarks</span>
            <h4 className="text-base font-bold text-text-primary">{bookmarks.length} Notes</h4>
          </div>
        </div>
      </div>

      {/* Bookmarked Notes Section */}
      <section>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-text-primary">My Saved Study Materials</h2>
            <p className="text-xs text-text-secondary">Materials you bookmarked for reference</p>
          </div>
          <Link
            to="/bookmarks"
            className="text-xs font-semibold text-primary hover:text-primary-hover"
          >
            Manage Bookmarks →
          </Link>
        </div>

        {bookmarks.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No notes bookmarked yet"
            description="Explore our curated catalog to bookmark important units."
            actionLabel="Discover Notes"
            actionLink="/notes"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarks.slice(0, 3).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
