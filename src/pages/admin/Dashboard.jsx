import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Download,
  AlertCircle,
  Plus,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { getNotes, updateNoteStatus } from '../../services/notesService';
import { getReports, resolveReport } from '../../services/reportsService';
import { mockUsers } from '../../data/mockUsers';
import { formatDate, formatDownloads } from '../../utils/formatters';

export function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allNotes, allReports] = await Promise.all([
        getNotes({ status: 'all' }),
        getReports({ status: 'all' })
      ]);
      setNotes(allNotes);
      setReports(allReports);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalDownloads = notes.reduce((sum, n) => sum + (n.downloads || 0), 0);
  const pendingReports = reports.filter(r => r.status === 'pending');
  const recentUploads = notes.slice(0, 5);
  const popularNotes = [...notes].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 5);

  const handleStatusToggle = async (noteId, newStatus) => {
    await updateNoteStatus(noteId, newStatus);
    loadData();
  };

  const handleQuickResolve = async (reportId) => {
    await resolveReport(reportId, 'Resolved from coordinator dashboard');
    loadData();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Published Notes"
          value={notes.filter(n => n.status === 'published').length}
          subtitle={`${notes.length} total across all terms`}
          icon={FileText}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          trend="+4 this week"
        />

        <StatCard
          title="Active Students"
          value={mockUsers.students.length}
          subtitle="Registered engineering scholars"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend="Active"
        />

        <StatCard
          title="Cumulative Downloads"
          value={formatDownloads(totalDownloads)}
          subtitle="Document views and saves"
          icon={Download}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend="+18% month"
        />

        <StatCard
          title="Pending Reports"
          value={pendingReports.length}
          subtitle="Unresolved student flags"
          icon={AlertCircle}
          iconColor={pendingReports.length > 0 ? "text-amber-600" : "text-slate-400"}
          iconBg={pendingReports.length > 0 ? "bg-amber-50" : "bg-slate-100"}
        />
      </div>

      {/* Two Column Section: Recent Uploads & Popular Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Uploads Table (2 Cols) */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Recent Material Uploads</h3>
                <p className="text-xs text-text-secondary">Latest syllabus guides added to repository</p>
              </div>
              <Link
                to="/admin/notes"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-text-muted text-[11px] uppercase border-b border-border">
                    <th className="pb-2 font-medium">Title</th>
                    <th className="pb-2 font-medium">Branch/Sem</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentUploads.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 max-w-[200px]">
                        <p className="font-semibold text-text-primary truncate">{n.title}</p>
                        <span className="text-[11px] text-text-secondary">{n.subject}</span>
                      </td>
                      <td className="py-2.5 text-text-secondary">
                        {n.branch} • Sem {n.semester} (U{n.unit})
                      </td>
                      <td className="py-2.5">
                        <StatusBadge status={n.status} />
                      </td>
                      <td className="py-2.5 text-right">
                        {n.status === 'published' ? (
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(n.id, 'draft')}
                            className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(n.id, 'published')}
                            className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100"
                          >
                            Publish
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-4 flex justify-end">
            <Link
              to="/admin/notes/upload"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload New Material</span>
            </Link>
          </div>
        </div>

        {/* Most Downloaded Notes (1 Col) */}
        <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-text-primary">Most Downloaded</h3>
            </div>
            <span className="text-[11px] text-text-muted">Top 5</span>
          </div>

          <div className="space-y-3">
            {popularNotes.map((pn, idx) => (
              <div
                key={pn.id}
                className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary truncate">
                      {pn.title}
                    </p>
                    <p className="text-[11px] text-text-secondary truncate">
                      {pn.subject} • Sem {pn.semester}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800 shrink-0">
                  {formatDownloads(pn.downloads)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incident Reports Row */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Pending Student Reports</h3>
            <p className="text-xs text-text-secondary">Flagged notes requiring departmental review</p>
          </div>
          <Link
            to="/admin/reports"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>All Reports ({reports.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingReports.length === 0 ? (
          <div className="text-center py-6 text-xs text-text-secondary">
            ✓ All student incident reports are currently resolved!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingReports.slice(0, 3).map((rep) => (
              <div
                key={rep.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">{rep.noteTitle}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {rep.reason}
                    </span>
                  </div>
                  <p className="text-text-secondary text-[11px] mt-0.5">
                    "{rep.details}" — <span className="italic">{rep.reporterName}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuickResolve(rep.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-xs"
                  >
                    Quick Resolve
                  </button>
                  <Link
                    to="/admin/reports"
                    className="px-3 py-1.5 rounded-lg border border-border bg-white text-text-secondary hover:bg-slate-50"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
