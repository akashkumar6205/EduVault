import React from 'react';
import { FolderSearch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmptyState({
  icon: Icon = FolderSearch,
  title = 'No items found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  actionLabel,
  actionLink,
  onAction,
  className = ''
}) {
  return (
    <div
      className={`text-center py-12 px-4 rounded-xl border border-dashed border-border bg-white/50 flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3.5">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-secondary max-w-sm mx-auto mb-5 leading-relaxed">{description}</p>
      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors shadow-sm"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors shadow-sm"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
