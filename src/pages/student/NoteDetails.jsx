import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Download,
  Bookmark,
  Share2,
  Flag,
  ArrowLeft,
  Eye,
  Check,
  User,
  GraduationCap
} from 'lucide-react';
import { getNoteById, getNotes } from '../../services/notesService';
import { PDFViewer } from '../../components/PDFViewer';
import { BookmarkButton } from '../../components/BookmarkButton';
import { DownloadButton } from '../../components/DownloadButton';
import { ReportModal } from '../../components/ReportModal';
import { NoteCard } from '../../components/NoteCard';
import { formatDate, formatDownloads } from '../../utils/formatters';

export function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [relatedNotes, setRelatedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const found = await getNoteById(id);
        setNote(found);

        if (found) {
          // Fetch related notes in the same subject or branch
          const related = await getNotes({
            subject: found.subject,
            status: 'published'
          });
          setRelatedNotes(related.filter(n => n.id !== found.id).slice(0, 3));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-1/3 bg-gray-100 rounded"></div>
        <div className="h-[500px] bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-text-primary">Note Not Found</h2>
        <p className="text-xs text-text-secondary mt-1 mb-6">
          The requested note may have been uncurated, moved, or deleted.
        </p>
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/notes" className="hover:text-primary transition-colors">Notes</Link>
          <span>/</span>
          <Link
            to={`/notes?branch=${note.branch}`}
            className="hover:text-primary transition-colors"
          >
            {note.branch}
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium truncate max-w-xs">{note.title}</span>
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-lg border border-border bg-white"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Link Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Note Header & Summary Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-primary border border-indigo-100">
                {note.branch} • Semester {note.semester}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                Unit {note.unit}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                {note.type}
              </span>
            </div>

            {/* Note Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {note.title}
            </h1>

            {/* Subject Link */}
            <p className="text-sm font-medium text-primary">
              Subject: {note.subject}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
              {note.description}
            </p>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-xs text-text-muted">Keywords:</span>
                {note.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-600 border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Card / Meta Highlights */}
          <div className="lg:w-80 shrink-0 bg-slate-50/70 rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-text-secondary">Instructor / Author</span>
                <span className="font-semibold text-text-primary">{note.author || 'Academic Faculty'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-text-secondary">File Format & Size</span>
                <span className="font-semibold text-text-primary">PDF • {note.fileSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-text-secondary">Length</span>
                <span className="font-semibold text-text-primary">{note.pages || 28} pages</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-text-secondary">Verified Date</span>
                <span className="font-semibold text-text-primary">{formatDate(note.uploadDate)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Total Downloads</span>
                <span className="font-semibold text-text-primary">{formatDownloads(note.downloads)} times</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2 pt-2">
              <DownloadButton
                note={note}
                variant="primary"
                className="w-full py-2.5 text-xs font-semibold justify-center shadow-xs"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <BookmarkButton
                    noteId={note.id}
                    showLabel={true}
                    className="w-full py-2 bg-white border border-border text-xs justify-center hover:bg-slate-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="px-3 py-2 rounded-lg border border-border bg-white text-text-secondary hover:text-danger hover:border-red-200 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                  title="Report inaccurate content or broken PDF"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF In-App Preview Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Document Preview</h2>
          <span className="text-xs text-text-secondary">
            Reading mode • Page zoom available
          </span>
        </div>

        <PDFViewer note={note} onReport={() => setIsReportOpen(true)} />
      </section>

      {/* Related Notes */}
      {relatedNotes.length > 0 && (
        <section className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Related Study Materials</h2>
              <p className="text-xs text-text-secondary">More notes for {note.subject}</p>
            </div>
            <Link
              to={`/notes?subject=${encodeURIComponent(note.subject)}`}
              className="text-xs font-semibold text-primary hover:text-primary-hover"
            >
              View Subject Notes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedNotes.map((rel) => (
              <NoteCard key={rel.id} note={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        note={note}
      />
    </div>
  );
}
