import React from 'react';
import { cn } from '../../utils/formatters';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary-light',
  trend
}) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-card flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-text-primary tracking-tight">
            {value}
          </span>
          {trend && (
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', iconBg, iconColor)}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
