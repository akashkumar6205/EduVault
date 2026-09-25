import React, { useState, useEffect } from 'react';
import { ReportTable } from '../../components/admin/ReportTable';
import { getReports, resolveReport, dismissReport } from '../../services/reportsService';

export function Reports() {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const data = await getReports({ status: statusFilter });
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [statusFilter]);

  const handleResolve = async (id, note) => {
    await resolveReport(id, note);
    loadReports();
  };

  const handleDismiss = async (id) => {
    await dismissReport(id);
    loadReports();
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            Student Incident Reports
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Audit reported syllabus discrepancies, corrupt files, or duplicate documents
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'pending', label: 'Pending' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'dismissed', label: 'Dismissed' }
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
      </div>

      <ReportTable
        reports={reports}
        onResolve={handleResolve}
        onDismiss={handleDismiss}
        isLoading={isLoading}
      />
    </div>
  );
}
