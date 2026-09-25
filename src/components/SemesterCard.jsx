import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

export function SemesterCard({ semester, noteCount = 0 }) {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][semester - 1] || semester;

  return (
    <Link
      to={`/notes?semester=${semester}`}
      className="group bg-surface rounded-xl border border-border p-4.5 hover:border-primary/50 shadow-card hover:shadow-card-hover transition-all duration-200 flex items-center justify-between hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
            Semester {semester}
          </h4>
          <p className="text-xs text-text-secondary mt-0.5">
            Term {roman} · {noteCount > 0 ? `${noteCount} notes` : 'All subjects'}
          </p>
        </div>
      </div>
      <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:bg-primary-light transition-all">
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
