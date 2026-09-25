import React from 'react';
import { cn } from '../utils/formatters';

export function StatusBadge({ status, className = '' }) {
  const norm = (status || '').toLowerCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-200';
  let label = status;

  if (norm === 'published' || norm === 'resolved' || norm === 'active') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    label = norm === 'published' ? 'Published' : norm === 'resolved' ? 'Resolved' : 'Active';
  } else if (norm === 'draft' || norm === 'pending') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    label = norm === 'draft' ? 'Draft' : 'Pending';
  } else if (norm === 'archived' || norm === 'dismissed' || norm === 'inactive') {
    styles = 'bg-slate-100 text-slate-600 border-slate-200';
    label = norm === 'archived' ? 'Archived' : norm === 'dismissed' ? 'Dismissed' : 'Inactive';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        styles,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {label}
    </span>
  );
}
