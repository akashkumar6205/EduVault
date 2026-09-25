import React from 'react';

export function NoteCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 animate-pulse flex flex-col justify-between h-56">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-14 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 w-4/5 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-3/5 bg-gray-100 rounded mb-4"></div>
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-gray-100 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function SubjectCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-14 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3.5 w-full bg-gray-100 rounded mb-1.5"></div>
      <div className="h-3.5 w-2/3 bg-gray-100 rounded mb-4"></div>
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 animate-pulse flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-7 w-28 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="animate-pulse border-b border-border">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  );
}
