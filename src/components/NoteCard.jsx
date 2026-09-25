import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Download, BookOpen } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';
import { DownloadButton } from './DownloadButton';
import { formatDownloads } from '../utils/formatters';

export function NoteCard({ note, priority = false }) {
  return (
    <div className="group bg-surface rounded-xl border border-border hover:border-slate-300 p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5">
      <div>
        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span className="truncate max-w-[130px]">{note.type || 'Notes'}</span>
          </span>
          <span className="text-[11px] text-text-secondary font-medium">
            Unit {note.unit}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/notes/${note.id}`}
          className="block group-hover:text-primary transition-colors"
        >
          <h3 className="text-sm sm:text-base font-semibold text-text-primary line-clamp-2 leading-snug">
            {note.title}
          </h3>
        </Link>

        {/* Subject & Semester */}
        <p className="text-xs text-text-secondary mt-1.5 line-clamp-1">
          <span className="font-medium text-slate-700">{note.subject}</span>
          <span className="mx-1.5 opacity-40">·</span>
          <span>Sem {note.semester}</span>
          <span className="mx-1.5 opacity-40">·</span>
          <span>{note.branch}</span>
        </p>

        {/* File & stats summary */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-text-muted">
          <span>PDF • {note.fileSize}</span>
          <span>•</span>
          <span>{note.pages ? `${note.pages} pages` : 'Verified'}</span>
          <span>•</span>
          <span>{formatDownloads(note.downloads)} downloads</span>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to={`/notes/${note.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-text-primary bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </Link>
          <DownloadButton note={note} />
        </div>

        <BookmarkButton noteId={note.id} />
      </div>
    </div>
  );
}
