import { useState, useEffect, useCallback } from 'react';
import { getSubjects } from '../services/subjectsService';

export function useSubjects(filters = {}) {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterKey = JSON.stringify(filters);

  const fetchSubjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSubjects(filters);
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
    } finally {
      setIsLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return { subjects, isLoading, error, refetch: fetchSubjects };
}
