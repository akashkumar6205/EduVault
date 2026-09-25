import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { FilterSidebar } from '../../components/FilterSidebar';
import { NoteGrid } from '../../components/NoteGrid';
import { SearchBar } from '../../components/SearchBar';
import { Pagination } from '../../components/Pagination';
import { Modal } from '../../components/Modal';
import { useNotes } from '../../hooks/useNotes';
import { useSubjects } from '../../hooks/useSubjects';

const ITEMS_PER_PAGE = 9;

export function Notes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Read filter query params from URL
  const filters = useMemo(() => ({
    branch: searchParams.get('branch') || 'All',
    semester: searchParams.get('semester') || 'All',
    subject: searchParams.get('subject') || 'All',
    unit: searchParams.get('unit') || 'All',
    type: searchParams.get('type') || 'All',
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    status: 'published' // Strictly published notes for students
  }), [searchParams]);

  const { notes, isLoading, error } = useNotes(filters);
  const { subjects } = useSubjects();

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== 'All' && k !== 'status') {
        params.set(k, v);
      }
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setMobileFilterOpen(false);
  };

  // Pagination calculation
  const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE);
  const paginatedNotes = notes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activePills = Object.entries(filters).filter(
    ([k, v]) => v && v !== 'All' && k !== 'status' && k !== 'sortBy' && k !== 'search'
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notes Explorer</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Discover {notes.length} curated study resources across all departments
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-72">
            <SearchBar
              initialValue={filters.search}
              onSearch={(q) => updateFilters({ ...filters, search: q })}
              placeholder="Search in results..."
            />
          </div>

          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value })}
              className="bg-white border border-border text-xs rounded-xl px-3 py-2 pr-8 text-text-primary font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="unit">Unit (Ascending)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-white text-xs font-semibold text-text-primary hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span>Filters</span>
            {activePills.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                {activePills.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filter Pills */}
      {activePills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-text-secondary font-medium">Applied:</span>
          {activePills.map(([key, val]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 border border-indigo-100 text-primary"
            >
              <span className="capitalize">{key}: {val}</span>
              <button
                type="button"
                onClick={() => updateFilters({ ...filters, [key]: 'All' })}
                className="hover:text-danger ml-0.5"
                aria-label={`Remove ${key} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-text-secondary hover:text-danger font-medium ml-1 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content Area: Sidebar + Grid (Separate Independent Scroll Panes) */}
      <div className="flex gap-8 items-start md:h-[calc(100vh-14.5rem)] md:min-h-[520px]">
        {/* Desktop Filter Sidebar - Separate Left Scroll */}
        <div className="hidden md:block w-72 shrink-0 h-full">
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilters}
            onClearFilters={clearFilters}
            subjects={subjects}
            className="h-full"
          />
        </div>

        {/* Mobile Filter Modal Bottom-Sheet */}
        <Modal
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          title="Filter Notes"
          isBottomSheet={true}
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilters}
            onClearFilters={clearFilters}
            subjects={subjects}
            isMobileModal={true}
            onClose={() => setMobileFilterOpen(false)}
          />
        </Modal>

        {/* Notes Data Part - Separate Right Scroll */}
        <div className="flex-1 min-w-0 h-full md:overflow-y-auto md:pr-3 md:pb-6 overscroll-contain">
          <NoteGrid
            notes={paginatedNotes}
            isLoading={isLoading}
            emptyTitle="No matching notes found"
            emptyDescription="No study material matches your selected filters. Try broadening your branch, semester, or unit criteria."
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={notes.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}
