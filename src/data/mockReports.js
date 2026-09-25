export const mockReports = [
  {
    id: 'rep-001',
    noteId: 'note-03',
    noteTitle: 'Trees & Binary Search Trees — Unit 3',
    reporterName: 'Priya Sharma',
    reporterEmail: 'priya.s@student.edu',
    reason: 'Incorrect / Inaccurate Content',
    details: 'Page 14 shows wrong AVL tree rotation steps for right-left (RL) double rotation scenario.',
    date: '2026-09-12T14:32:00Z',
    status: 'pending' // 'pending' | 'resolved' | 'dismissed'
  },
  {
    id: 'rep-002',
    noteId: 'note-08',
    noteTitle: 'CPU Scheduling Algorithms — Unit 2',
    reporterName: 'Rahul Verma',
    reporterEmail: 'rahul.v@student.edu',
    reason: 'Wrong Unit / Semester',
    details: 'This file contains content for Unit 3 (Deadlocks) instead of Unit 2 (CPU Scheduling).',
    date: '2026-09-15T09:15:00Z',
    status: 'pending'
  },
  {
    id: 'rep-003',
    noteId: 'note-11',
    noteTitle: 'Continuous-Time Fourier Transform (CTFT) — Unit 2',
    reporterName: 'Ananya Iyer',
    reporterEmail: 'ananya.i@student.edu',
    reason: 'File Corrupted or Won\'t Open',
    details: 'The PDF has blank pages on slides 12 through 19.',
    date: '2026-09-18T18:40:00Z',
    status: 'resolved',
    resolvedAt: '2026-09-19T10:00:00Z',
    resolutionNote: 'Re-uploaded verified uncorrupted PDF version from department repository.'
  },
  {
    id: 'rep-004',
    noteId: 'note-15',
    noteTitle: 'Carnot Cycle & Entropy Principles — Unit 2',
    reporterName: 'Karthik Nair',
    reporterEmail: 'karthik.n@student.edu',
    reason: 'Duplicate Upload',
    details: 'Identical to Unit 1 upload notes with different filename.',
    date: '2026-09-20T11:25:00Z',
    status: 'pending'
  }
];
