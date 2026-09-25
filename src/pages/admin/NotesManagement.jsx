import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';
import { NotesTable } from '../../components/admin/NotesTable';
import { SearchBar } from '../../components/SearchBar';
import { getNotes, updateNoteStatus, deleteNote } from '../../services/notesService';
import { BRANCHES } from '../../utils/constants';

export function NotesManagement() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getNotes({
        status: statusFilter,
        branch: branchFilter,
        search
      });
      setNotes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [statusFilter, branchFilter, search]);

  const handleStatusChange = async (id, newStatus) => {
    await updateNoteStatus(id, newStatus);
    loadNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const statusCounts = {
    all: notes.length,
    published: notes.filter(n => n.status === 'published').length,
    draft: notes.filter(n => n.status === 'draft').length,
    archived: notes.filter(n => n.status === 'archived').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            Notes Catalog & Publishing
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage, curate, unpublish, and audit department course materials
          </p>
        </div>

        <Link
          to="/admin/notes/upload"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Study Material</span>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: 'all', label: 'All Materials' },
            { id: 'published', label: 'Published' },
            { id: 'draft', label: 'Drafts' },
            { id: 'archived', label: 'Archived' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
                statusFilter === tab.id
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Branch & Search Filter */}
        <div className="flex items-center gap-2">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-white border border-border text-xs rounded-xl px-2.5 py-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="All">All Branches</option>
            {BRANCHES.map(b => (
              <option key={b.id} value={b.code}>{b.code}</option>
            ))}
          </select>

          <div className="w-48 sm:w-64">
            <SearchBar
              initialValue={search}
              onSearch={setSearch}
              placeholder="Search notes or subject…"
            />
          </div>
        </div>
      </div>

      {/* Notes Table */}
      <NotesTable
        notes={notes}
        onStatusChange={handleStatusChange}
        onDeleteNote={handleDeleteNote}
        isLoading={isLoading}
      />
    </div>
  );
}
