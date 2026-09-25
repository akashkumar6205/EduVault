import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheck, Database, HardDrive, RefreshCw, CheckCircle2 } from 'lucide-react';
import { mockNotes } from '../../data/mockNotes';
import { mockSubjects } from '../../data/mockSubjects';
import { mockReports } from '../../data/mockReports';

export function Settings() {
  const { admin } = useAdminAuth();
  const [resetDone, setResetDone] = useState(false);

  const handleResetData = () => {
    localStorage.removeItem('eduvault_notes');
    localStorage.removeItem('eduvault_subjects');
    localStorage.removeItem('eduvault_reports');
    localStorage.removeItem('eduvault_bookmarks');
    setResetDone(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      <div className="pb-4 border-b border-border">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          Portal Administration & Settings
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Coordinator credentials, platform storage metrics, and mock data management
        </p>
      </div>

      {resetDone && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Local mock data reset to initial defaults. Reloading…</span>
        </div>
      )}

      {/* Admin Profile Details */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Administrator Profile</span>
        </h3>

        <div className="flex items-center gap-4 pt-2">
          <img
            src={admin?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
            alt="Admin"
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <h4 className="text-sm font-bold text-text-primary">{admin?.name}</h4>
            <p className="text-xs text-text-secondary">{admin?.email}</p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">{admin?.department}</p>
          </div>
        </div>
      </div>

      {/* Backend & Architecture Status */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-600" />
          <span>Architecture & Integration Seam</span>
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          The platform operates on a swappable mock service layer conforming to the contract documented in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">ARCHITECTURE.md</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-text-muted block">Current Mode</span>
            <span className="font-semibold text-text-primary">Frontend Prototype</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-text-muted block">Persistence Target</span>
            <span className="font-semibold text-text-primary">Browser LocalStorage</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-text-muted block">Planned Real Backend</span>
            <span className="font-semibold text-text-primary">Node.js + Express + Mongo</span>
          </div>
        </div>
      </div>

      {/* Prototype Reset Controls */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-slate-600" />
          <span>Reset Demo Data</span>
        </h3>
        <p className="text-xs text-text-secondary">
          Reset all newly added notes, edited subjects, and bookmarks back to the clean baseline dataset.
        </p>

        <button
          type="button"
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-text-primary text-xs font-semibold transition-colors"
        >
          Reset Local Prototype Storage
        </button>
      </div>
    </div>
  );
}
