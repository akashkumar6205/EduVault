import React, { useState, useMemo } from 'react';
import { SubjectCard } from '../../components/SubjectCard';
import { SearchBar } from '../../components/SearchBar';
import { useSubjects } from '../../hooks/useSubjects';
import { BRANCHES, SEMESTERS } from '../../utils/constants';
import { BookOpen } from 'lucide-react';
import { SubjectCardSkeleton } from '../../components/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState';

export function Subjects() {
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [search, setSearch] = useState('');

  const { subjects, isLoading } = useSubjects({
    branch: selectedBranch,
    semester: selectedSemester,
    search
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Academic Subjects</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Browse semester curriculum and course syllabus notes
          </p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar
            initialValue={search}
            onSearch={setSearch}
            placeholder="Search subject or code..."
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-3">
        {/* Branch Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedBranch('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedBranch === 'All'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
            }`}
          >
            All Branches
          </button>
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBranch(b.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedBranch === b.code
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Semester Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-text-muted font-medium mr-1 shrink-0">Semester:</span>
          <button
            type="button"
            onClick={() => setSelectedSemester('All')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedSemester === 'All'
                ? 'bg-slate-800 text-white'
                : 'bg-white border border-border text-slate-600 hover:bg-slate-50'
            }`}
          >
            All
          </button>
          {SEMESTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSemester(s)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                Number(selectedSemester) === s
                  ? 'bg-slate-800 text-white'
                  : 'bg-white border border-border text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sem {s}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SubjectCardSkeleton key={i} />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects found"
          description="Try selecting another branch or clearing your search filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedBranch('All');
            setSelectedSemester('All');
            setSearch('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
      )}
    </div>
  );
}
