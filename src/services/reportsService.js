import { mockReports } from '../data/mockReports';

const STORAGE_KEY = 'eduvault_reports';

function getStoredReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Storage read error:', e);
  }
  return [...mockReports];
}

function saveStoredReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

const simulateDelay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export async function getReports(filters = {}) {
  await simulateDelay(180);
  let reports = getStoredReports();

  if (filters.status && filters.status !== 'all') {
    reports = reports.filter(r => r.status === filters.status);
  }

  // Sort newest first
  reports.sort((a, b) => new Date(b.date) - new Date(a.date));

  return reports;
}

export async function submitReport(reportData) {
  await simulateDelay(250);
  const reports = getStoredReports();
  const newReport = {
    ...reportData,
    id: `rep-${Date.now()}`,
    date: new Date().toISOString(),
    status: 'pending'
  };
  reports.unshift(newReport);
  saveStoredReports(reports);
  return newReport;
}

export async function resolveReport(id, resolutionNote = '') {
  await simulateDelay(200);
  const reports = getStoredReports();
  const report = reports.find(r => r.id === id);
  if (!report) throw new Error('Report not found');

  report.status = 'resolved';
  report.resolvedAt = new Date().toISOString();
  report.resolutionNote = resolutionNote || 'Resolved by administrator.';

  saveStoredReports(reports);
  return report;
}

export async function dismissReport(id) {
  await simulateDelay(200);
  const reports = getStoredReports();
  const report = reports.find(r => r.id === id);
  if (!report) throw new Error('Report not found');

  report.status = 'dismissed';
  saveStoredReports(reports);
  return report;
}
