import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { NoteCard } from '../../components/NoteCard';
import { EmptyState } from '../../components/EmptyState';
import { NoteCardSkeleton } from '../../components/LoadingSkeleton';

export function Bookmarks() {
  const { bookmarks, isLoading } = useBookmarks();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary fill-primary" />
          <h1 className="text-2xl font-bold text-text-primary">Saved Bookmarks</h1>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Quickly access your pinned study materials for exam preparation and revisions
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <NoteCardSkeleton key={i} />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Save important lecture notes, formula sheets, or exam papers so you can quickly access them later."
          actionLabel="Browse Notes"
          actionLink="/notes"
        />
      ) : (
        <div>
          <div className="text-xs text-text-muted mb-4">
            You have <span className="font-semibold text-text-primary">{bookmarks.length}</span> saved {bookmarks.length === 1 ? 'note' : 'notes'}:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarks.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
