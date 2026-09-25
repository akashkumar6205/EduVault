import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { BRANCHES, SEMESTERS, UNITS, NOTE_TYPES } from '../utils/constants';
import { cn } from '../utils/formatters';

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  subjects = [],
  isMobileModal = false,
  onClose,
  className = ''
}) {
  const handleSelect = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v && v !== 'All' && k !== 'search' && k !== 'sortBy'
  ).length;

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 text-[11px] font-bold bg-primary text-white rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-danger transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Engineering Branch */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Branch
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleSelect('branch', 'All')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filters.branch || filters.branch === 'All'
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
              onClick={() => handleSelect('branch', b.code)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.branch === b.code
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
            >
              {b.code}
            </button>
          ))}
        </div>
      </div>

      {/* Semester */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Semester
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => handleSelect('semester', 'All')}
            className={`col-span-4 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filters.semester || filters.semester === 'All'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
            }`}
          >
            All Semesters
          </button>
          {SEMESTERS.map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => handleSelect('semester', sem)}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors text-center ${
                Number(filters.semester) === sem
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Unit */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Unit
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleSelect('unit', 'All')}
            className={`col-span-3 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filters.unit || filters.unit === 'All'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
            }`}
          >
            All Units
          </button>
          {UNITS.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleSelect('unit', u)}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors text-center ${
                Number(filters.unit) === u
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
            >
              Unit {u}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
          Subject
        </label>
        <select
          value={filters.subject || 'All'}
          onChange={(e) => handleSelect('subject', e.target.value)}
          className="w-full bg-white border border-border text-text-primary text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="All">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>
      </div>

      {/* Note Type */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
          Material Type
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer hover:text-text-primary">
            <input
              type="radio"
              name="type"
              checked={!filters.type || filters.type === 'All'}
              onChange={() => handleSelect('type', 'All')}
              className="text-primary focus:ring-primary"
            />
            <span>All Types</span>
          </label>
          {NOTE_TYPES.map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer hover:text-text-primary"
            >
              <input
                type="radio"
                name="type"
                checked={filters.type === t}
                onChange={() => handleSelect('type', t)}
                className="text-primary focus:ring-primary"
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobileModal) {
    return (
      <div>
        {content}
        <div className="pt-5 mt-6 border-t border-border flex gap-3">
          <button
            type="button"
            onClick={onClearFilters}
            className="flex-1 py-2.5 px-4 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-slate-50 transition-colors"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'w-full bg-surface rounded-xl border border-border p-5 shadow-card h-full max-h-full overflow-y-auto overscroll-contain',
        className
      )}
    >
      {content}
    </aside>
  );
}
