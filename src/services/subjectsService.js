import { mockSubjects } from '../data/mockSubjects';

const STORAGE_KEY = 'eduvault_subjects';

function getStoredSubjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Storage read error:', e);
  }
  return [...mockSubjects];
}

function saveStoredSubjects(subjects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

const simulateDelay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export async function getSubjects(filters = {}) {
  await simulateDelay(150);
  let subjects = getStoredSubjects();

  if (filters.branch && filters.branch !== 'All') {
    subjects = subjects.filter(s => s.branch.toUpperCase() === filters.branch.toUpperCase());
  }

  if (filters.semester && filters.semester !== 'All') {
    subjects = subjects.filter(s => Number(s.semester) === Number(filters.semester));
  }

  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    subjects = subjects.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }

  return subjects;
}

export async function getSubjectById(id) {
  await simulateDelay(100);
  const subjects = getStoredSubjects();
  return subjects.find(s => s.id === id || s.code.toLowerCase() === id.toLowerCase()) || null;
}

export async function createSubject(subjectData) {
  await simulateDelay(300);
  const subjects = getStoredSubjects();
  const newSubject = {
    ...subjectData,
    id: `sub-${Date.now()}`,
    noteCount: 0,
    status: subjectData.status || 'active'
  };
  subjects.unshift(newSubject);
  saveStoredSubjects(subjects);
  return newSubject;
}

export async function updateSubject(id, subjectData) {
  await simulateDelay(250);
  const subjects = getStoredSubjects();
  const index = subjects.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Subject not found');

  subjects[index] = { ...subjects[index], ...subjectData };
  saveStoredSubjects(subjects);
  return subjects[index];
}

export async function deleteSubject(id) {
  await simulateDelay(200);
  const subjects = getStoredSubjects();
  const filtered = subjects.filter(s => s.id !== id);
  saveStoredSubjects(filtered);
  return true;
}
