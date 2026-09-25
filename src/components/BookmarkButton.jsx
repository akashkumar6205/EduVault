import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/formatters';

export function BookmarkButton({ noteId, className = '', showLabel = false }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);

  const active = isBookmarked(noteId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please log in to save bookmarks.' } });
      return;
    }

    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      await toggleBookmark(noteId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Remove bookmark' : 'Bookmark note'}
      title={active ? 'Remove bookmark' : 'Save to bookmarks'}
      className={cn(
        'p-2 rounded-lg transition-all duration-150 inline-flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        active
          ? 'text-primary bg-primary-light hover:bg-indigo-100'
          : 'text-text-secondary hover:text-text-primary hover:bg-gray-100',
        animating && 'scale-125',
        className
      )}
    >
      <Bookmark
        className={cn('w-4 h-4 transition-colors', active && 'fill-primary stroke-primary')}
      />
      {showLabel && (
        <span className="text-xs font-medium">
          {active ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
