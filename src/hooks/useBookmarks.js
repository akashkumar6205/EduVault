import { useState, useEffect, useCallback } from 'react';
import { getBookmarks, toggleBookmark as apiToggleBookmark } from '../services/bookmarksService';
import { useAuth } from '../context/AuthContext';

export function useBookmarks() {
  const { student } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!student?.id) {
      setBookmarks([]);
      setBookmarkedIds(new Set());
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const items = await getBookmarks(student.id);
      setBookmarks(items);
      setBookmarkedIds(new Set(items.map(b => b.id)));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const toggle = async (noteId) => {
    if (!student?.id) {
      throw new Error('Please log in to bookmark notes.');
    }
    const isNowBookmarked = await apiToggleBookmark(student.id, noteId);
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (isNowBookmarked) {
        next.add(noteId);
      } else {
        next.delete(noteId);
      }
      return next;
    });
    fetchBookmarks();
    return isNowBookmarked;
  };

  const isBookmarked = (noteId) => bookmarkedIds.has(noteId);

  return {
    bookmarks,
    bookmarkedIds,
    isLoading,
    toggleBookmark: toggle,
    isBookmarked,
    refetch: fetchBookmarks
  };
}
