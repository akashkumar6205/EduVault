import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export function SubjectCard({ subject }) {
  return (
    <Link
      to={`/notes?subject=${encodeURIComponent(subject.name)}`}
      className="group bg-surface rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover hover:border-primary/50 transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 tracking-wide">
            {subject.code}
          </span>
          <span className="text-[11px] text-text-secondary font-medium">
            Sem {subject.semester} · {subject.branch}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
          {subject.name}
        </h4>

        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
          {subject.description}
        </p>
      </div>

      <div className="pt-3.5 mt-3.5 border-t border-border flex items-center justify-between text-xs">
        <span className="font-medium text-primary">
          {subject.noteCount || 0} study materials
        </span>
        <span className="inline-flex items-center gap-1 text-text-muted group-hover:text-primary transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
