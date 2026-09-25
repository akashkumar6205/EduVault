import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  MoreVertical,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Modal } from '../Modal';
import { formatDate, formatDownloads } from '../../utils/formatters';

export function NotesTable({
  notes = [],
  onStatusChange,
  onDeleteNote,
  isLoading = false
}) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDeleteNote(deleteTarget.id);
      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  if (notes.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-border">
        <p className="text-sm font-semibold text-text-primary">No notes found</p>
        <p className="text-xs text-text-secondary mt-1">
          No materials match your current search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block bg-surface rounded-xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-border text-text-secondary uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Subject & Branch</th>
                <th className="py-3 px-4">Sem / Unit</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <Link
                      to={`/notes/${note.id}`}
                      target="_blank"
                      className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1 flex items-center gap-1.5"
                    >
                      <span>{note.title}</span>
                      <ExternalLink className="w-3 h-3 text-text-muted" />
                    </Link>
                    <span className="text-[11px] text-text-secondary line-clamp-1 mt-0.5">
                      {note.type} • {note.fileSize}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-text-primary block truncate max-w-[140px]">
                      {note.subject}
                    </span>
                    <span className="text-[11px] text-text-secondary">{note.branch}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-text-primary">Sem {note.semester}</span>
                    <span className="text-text-muted block text-[11px]">Unit {note.unit}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-text-primary">
                    {formatDownloads(note.downloads)}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={note.status} />
                  </td>

                  <td className="py-3.5 px-4 text-text-secondary">
                    {formatDate(note.uploadDate)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Status toggle button */}
                      {note.status === 'published' ? (
                        <button
                          type="button"
                          onClick={() => onStatusChange(note.id, 'draft')}
                          title="Unpublish note (revert to Draft)"
                          className="p-1.5 text-text-secondary hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onStatusChange(note.id, 'published')}
                          title="Publish note immediately"
                          className="p-1.5 text-text-secondary hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}

                      {/* Edit */}
                      <Link
                        to={`/admin/notes/${note.id}/edit`}
                        title="Edit note metadata or file"
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(note)}
                        title="Delete note"
                        className="p-1.5 text-text-secondary hover:text-danger hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Card List (PRD FR-21 / DESIGN Section 5.7) */}
      <div className="md:hidden space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-surface rounded-xl border border-border p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-text-primary line-clamp-1">
                  {note.title}
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  {note.subject} • Sem {note.semester} (Unit {note.unit})
                </p>
              </div>
              <StatusBadge status={note.status} />
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border">
              <span>{formatDownloads(note.downloads)} downloads</span>
              <span>{formatDate(note.uploadDate)}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              {note.status === 'published' ? (
                <button
                  type="button"
                  onClick={() => onStatusChange(note.id, 'draft')}
                  className="px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-lg border border-amber-200"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onStatusChange(note.id, 'published')}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  Publish
                </button>
              )}
              <Link
                to={`/admin/notes/${note.id}/edit`}
                className="px-2.5 py-1 text-xs font-medium text-primary bg-indigo-50 rounded-lg border border-indigo-200"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => setDeleteTarget(note)}
                className="px-2.5 py-1 text-xs font-medium text-danger bg-red-50 rounded-lg border border-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Note Deletion"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 text-danger rounded-xl border border-red-200 text-xs">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>
              Are you sure you want to permanently delete{' '}
              <strong>"{deleteTarget?.title}"</strong>? This will remove access for all students.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-danger text-white text-xs font-medium hover:bg-danger-dark transition-colors shadow-xs"
            >
              {isDeleting ? 'Deleting…' : 'Delete Permanently'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
