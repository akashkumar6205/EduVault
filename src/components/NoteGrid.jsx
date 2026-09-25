import React from 'react';
import { NoteCard } from './NoteCard';
import { NoteCardSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { BookOpen } from 'lucide-react';

export function NoteGrid({
  notes = [],
  isLoading = false,
  emptyTitle = 'No notes found',
  emptyDescription = 'Try changing your filter criteria or search query to find notes.',
  columns = 3
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <NoteCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
