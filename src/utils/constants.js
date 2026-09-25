export const BRANCHES = [
  { id: 'CSE', name: 'Computer Science & Engineering', code: 'CSE' },
  { id: 'ECE', name: 'Electronics & Communication', code: 'ECE' },
  { id: 'MECH', name: 'Mechanical Engineering', code: 'MECH' },
  { id: 'CIVIL', name: 'Civil Engineering', code: 'CIVIL' },
  { id: 'EEE', name: 'Electrical & Electronics', code: 'EEE' },
  { id: 'IT', name: 'Information Technology', code: 'IT' },
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const UNITS = [1, 2, 3, 4, 5];

export const NOTE_TYPES = [
  'Handwritten Notes',
  'Lecture Slides',
  'Formula Sheet',
  'Previous Year Questions (PYQ)',
  'Lab Manual'
];

export const NOTE_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
};

export const REPORT_REASONS = [
  'Wrong Subject',
  'Wrong Unit / Semester',
  'Incorrect / Inaccurate Content',
  'File Corrupted or Won\'t Open',
  'Duplicate Upload',
  'Other'
];

export const REPORT_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
};
