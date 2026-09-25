import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Eye, AlertCircle, ExternalLink } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Modal } from '../Modal';
import { formatDate } from '../../utils/formatters';

export function ReportTable({
  reports = [],
  onResolve,
  onDismiss,
  isLoading = false
}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResolveSubmit = async () => {
    if (!selectedReport) return;
    setIsSubmitting(true);
    try {
      await onResolve(selectedReport.id, resolutionNote);
      setSelectedReport(null);
      setResolutionNote('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reports.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-border">
        <p className="text-sm font-semibold text-text-primary">No incident reports</p>
        <p className="text-xs text-text-secondary mt-1">
          No active student reports require coordination at this time.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-border text-text-secondary uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4">Reported Note</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Student Reporter</th>
                <th className="py-3 px-4">Date Filed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <Link
                      to={`/notes/${report.noteId}`}
                      target="_blank"
                      className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1 flex items-center gap-1.5"
                    >
                      <span>{report.noteTitle}</span>
                      <ExternalLink className="w-3 h-3 text-text-muted" />
                    </Link>
                    <span className="text-[11px] text-text-secondary line-clamp-1 mt-0.5">
                      {report.details}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-danger border border-red-100 font-medium">
                      {report.reason}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-text-primary block">
                      {report.reporterName}
                    </span>
                    <span className="text-[11px] text-text-muted">{report.reporterEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 text-text-secondary">
                    {formatDate(report.date)}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={report.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-text-primary text-xs font-medium transition-colors"
                      >
                        Inspect
                      </button>

                      {report.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => onResolve(report.id, 'Resolved by coordinator')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Quick mark resolved"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDismiss(report.id)}
                            className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors"
                            title="Dismiss report"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Review & Resolution Modal */}
      <Modal
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title="Incident Report Details"
        subtitle={selectedReport ? `Filed on ${formatDate(selectedReport.date)}` : ''}
      >
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-text-muted font-medium block">Reported Study Material</span>
              <p className="font-semibold text-sm text-text-primary">{selectedReport.noteTitle}</p>
              <Link
                to={`/notes/${selectedReport.noteId}`}
                target="_blank"
                className="inline-flex items-center gap-1 text-primary hover:underline text-[11px] pt-1"
              >
                <span>Open Note in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-text-muted block">Primary Reason</span>
                <span className="font-semibold text-danger">{selectedReport.reason}</span>
              </div>
              <div>
                <span className="text-text-muted block">Reporter</span>
                <span className="font-semibold text-text-primary">{selectedReport.reporterName}</span>
                <span className="block text-text-muted">{selectedReport.reporterEmail}</span>
              </div>
            </div>

            <div>
              <span className="text-text-muted block mb-1 font-semibold">Student Notes & Explanation</span>
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-800 leading-relaxed">
                "{selectedReport.details}"
              </div>
            </div>

            {selectedReport.status === 'resolved' ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="font-semibold block">Resolution Status: Resolved</span>
                <p className="mt-0.5">{selectedReport.resolutionNote}</p>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="block text-xs font-semibold text-text-primary">
                  Coordinator Resolution Note
                </label>
                <textarea
                  rows={2}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g. Corrected formula sheet and replaced PDF file with revised version."
                  className="w-full bg-white border border-border rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            <div className="pt-3 border-t border-border flex justify-between items-center">
              {selectedReport.status === 'pending' ? (
                <button
                  type="button"
                  onClick={() => {
                    onDismiss(selectedReport.id);
                    setSelectedReport(null);
                  }}
                  className="text-xs text-text-secondary hover:text-danger"
                >
                  Dismiss Report
                </button>
              ) : <div></div>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-slate-50"
                >
                  Close
                </button>
                {selectedReport.status === 'pending' && (
                  <button
                    type="button"
                    onClick={handleResolveSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 shadow-xs"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
