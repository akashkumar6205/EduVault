import React, { useState } from 'react';
import { Modal } from './Modal';
import { REPORT_REASONS } from '../utils/constants';
import { submitReport } from '../services/reportsService';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ReportModal({ isOpen, onClose, note }) {
  const { student } = useAuth();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState('');
  const [reporterName, setReporterName] = useState(student?.name || '');
  const [reporterEmail, setReporterEmail] = useState(student?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      setError('Please provide a short description of the issue.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitReport({
        noteId: note.id,
        noteTitle: note.title,
        reporterName: reporterName || 'Anonymous Student',
        reporterEmail: reporterEmail || 'student@university.edu',
        reason,
        details: details.trim()
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setDetails('');
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Note Issue"
      subtitle={note ? `Flagging: ${note.title}` : ''}
      isBottomSheet={true}
    >
      {success ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-text-primary">Thank you for reporting</h4>
          <p className="text-xs text-text-secondary mt-1">
            Our academic coordinators will review this note and address any inaccuracies.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-danger text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Reason for Report <span className="text-danger">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white border border-border rounded-lg text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Explanation & Specific Details <span className="text-danger">*</span>
            </label>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. Page 12 has incorrect formulas for Laplace transform, or the file is corrupted..."
              className="w-full bg-white border border-border rounded-lg text-xs p-2.5 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-text-secondary mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Student name"
                className="w-full bg-white border border-border rounded-lg text-xs p-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-text-secondary mb-1">
                Email for status updates
              </label>
              <input
                type="email"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="student@edu.in"
                className="w-full bg-white border border-border rounded-lg text-xs p-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-danger text-white text-xs font-medium hover:bg-danger-dark transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Report'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
