import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, FileText, ArrowRight, Layers } from 'lucide-react';
import { SearchBar } from '../../components/SearchBar';
import { NoteCard } from '../../components/NoteCard';
import { SubjectCard } from '../../components/SubjectCard';
import { EmptyState } from '../../components/EmptyState';
import { useNotes } from '../../hooks/useNotes';
import { useSubjects } from '../../hooks/useSubjects';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebouncedSearch(query, 250);

  // Sync state to URL
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearchParams({ q: debouncedQuery.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedQuery, setSearchParams]);

  const { notes, isLoading: notesLoading } = useNotes({
    search: debouncedQuery,
    status: 'published'
  });

  const { subjects, isLoading: subjectsLoading } = useSubjects({
    search: debouncedQuery
  });

  const hasQuery = Boolean(debouncedQuery.trim());
  const totalResults = (hasQuery ? notes.length + subjects.length : 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Search Bar */}
      <div className="max-w-2xl mx-auto text-center space-y-4 pt-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Global Academic Search
        </h1>
        <p className="text-xs text-text-secondary">
          Find lecture notes, formula sheets, syllabus subjects, and units in one query
        </p>

        <SearchBar
          initialValue={query}
          onSearch={setQuery}
          placeholder="Search by topic, unit name, subject code (e.g. CS301, Trees, Fourier)..."
          variant="hero"
          className="shadow-sm"
        />

        {hasQuery && (
          <p className="text-xs text-text-muted">
            Found <span className="font-semibold text-text-primary">{totalResults}</span> matches for "{debouncedQuery}"
          </p>
        )}
      </div>

      {!hasQuery ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary">Start searching</h3>
          <p className="text-xs text-text-secondary mt-1">
            Type any keywords above to search across our full collection of lecture notes, unit guides, and subjects.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-xs">
            <span className="text-text-muted">Try:</span>
            {['Data Structures', 'Operating Systems', 'Fourier', 'Thermodynamics', 'Unit 1'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="px-2.5 py-1 bg-white border border-border rounded-lg text-slate-700 hover:text-primary hover:border-primary/50 text-xs"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : totalResults === 0 && !notesLoading && !subjectsLoading ? (
        <EmptyState
          icon={Search}
          title="No results match your query"
          description={`We couldn't find any notes or subjects matching "${debouncedQuery}". Try broader terms or check the spelling.`}
          actionLabel="Clear Search"
          onAction={() => setQuery('')}
        />
      ) : (
        <div className="space-y-12">
          {/* Matched Subjects Section */}
          {subjects.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold text-text-primary">
                    Matching Subjects ({subjects.length})
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subjects.map((s) => (
                  <SubjectCard key={s.id} subject={s} />
                ))}
              </div>
            </section>
          )}

          {/* Matched Notes Section */}
          {notes.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold text-text-primary">
                    Matching Study Materials ({notes.length})
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {notes.map((n) => (
                  <NoteCard key={n.id} note={n} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
