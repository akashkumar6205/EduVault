import { useState, useEffect, useCallback } from 'react';
import { getNotes } from '../services/notesService';

export function useNotes(filters = {}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialize filter parameters for dependency array stability
  const filterKey = JSON.stringify(filters);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNotes(filters);
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, isLoading, error, refetch: fetchNotes };
}
