import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { SearchBar } from '../../components/SearchBar';
import { SemesterCard } from '../../components/SemesterCard';
import { SubjectCard } from '../../components/SubjectCard';
import { NoteCard } from '../../components/NoteCard';
import { NoteCardSkeleton } from '../../components/LoadingSkeleton';
import { useNotes } from '../../hooks/useNotes';
import { useSubjects } from '../../hooks/useSubjects';
import { BRANCHES } from '../../utils/constants';

export function Home() {
  const { notes, isLoading: notesLoading } = useNotes({ status: 'published' });
  const { subjects, isLoading: subjectsLoading } = useSubjects();

  // Top 6 recent notes
  const recentNotes = notes.slice(0, 6);
  // Top 6 popular subjects
  const popularSubjects = subjects.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative text-center pt-8 sm:pt-14 pb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-indigo-100 text-primary text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated for Engineering Semesters 1 through 8</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
          Your College Notes,{' '}
          <span className="text-primary underline decoration-indigo-200 decoration-wavy decoration-2">
            Organized in One Place.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">
          Access verified lecture slides, handwritten unit notes, formula cheat sheets, and previous year question papers moderated by faculty.
        </p>

        {/* Hero Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <SearchBar variant="hero" autoNavigate={true} />
        </div>

        {/* Quick Branch Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-text-muted font-medium">Popular disciplines:</span>
          {BRANCHES.slice(0, 5).map((b) => (
            <Link
              key={b.id}
              to={`/notes?branch=${b.code}`}
              className="px-2.5 py-1 rounded-lg bg-white border border-border text-slate-700 hover:text-primary hover:border-primary/50 transition-colors font-medium shadow-2xs"
            >
              {b.code}
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Quality Signal Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-border shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Faculty & Coordinator Curated</h4>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
              Every document is vetted for syllabus accuracy before being published.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-primary flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Strict Unit-Wise Indexing</h4>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
              Search by semester, subject, and unit to study for upcoming midterms fast.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">In-App PDF Reader & Downloads</h4>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
              Preview documents directly on desktop or mobile, or download for offline revision.
            </p>
          </div>
        </div>
      </section>

      {/* Browse by Semester Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Browse by Semester</h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Jump straight into your current academic semester
            </p>
          </div>
          <Link
            to="/notes"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            <span>All Semesters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <SemesterCard key={sem} semester={sem} />
          ))}
        </div>
      </section>

      {/* Popular Subjects Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Popular Subjects</h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Key engineering subjects with verified notes and question banks
            </p>
          </div>
          <Link
            to="/subjects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjectsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-surface rounded-xl border border-border animate-pulse p-5">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
            ))
          ) : (
            popularSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))
          )}
        </div>
      </section>

      {/* Recently Added Notes Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Recently Added Notes</h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Newly uploaded handwritten materials and exam revision guides
            </p>
          </div>
          <Link
            to="/notes"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            <span>Explore All Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))
          ) : (
            recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
