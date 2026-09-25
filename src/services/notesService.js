import { mockNotes } from '../data/mockNotes';

const STORAGE_KEY = 'eduvault_notes';

function getStoredNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Storage read error:', e);
  }
  return [...mockNotes];
}

function saveStoredNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

const simulateDelay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

export async function getNotes(filters = {}) {
  await simulateDelay(200);
  let notes = getStoredNotes();

  // Filter by status (default: 'published' for students, or all if explicitly requested)
  if (filters.status && filters.status !== 'all') {
    notes = notes.filter(n => n.status === filters.status);
  } else if (!filters.status) {
    // default to published notes for student views
    notes = notes.filter(n => n.status === 'published');
  }

  // Filter by branch
  if (filters.branch && filters.branch !== 'All') {
    notes = notes.filter(n => n.branch.toUpperCase() === filters.branch.toUpperCase());
  }

  // Filter by semester
  if (filters.semester && filters.semester !== 'All') {
    notes = notes.filter(n => Number(n.semester) === Number(filters.semester));
  }

  // Filter by subject
  if (filters.subject && filters.subject !== 'All') {
    notes = notes.filter(n => n.subject.toLowerCase() === filters.subject.toLowerCase() || n.subjectId === filters.subject);
  }

  // Filter by unit
  if (filters.unit && filters.unit !== 'All') {
    notes = notes.filter(n => Number(n.unit) === Number(filters.unit));
  }

  // Filter by type
  if (filters.type && filters.type !== 'All') {
    notes = notes.filter(n => n.type.toLowerCase() === filters.type.toLowerCase());
  }

  // Search query across title, subject, tags, description
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    notes = notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Sorting
  if (filters.sortBy) {
    if (filters.sortBy === 'downloads') {
      notes.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (filters.sortBy === 'newest') {
      notes.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (filters.sortBy === 'unit') {
      notes.sort((a, b) => a.unit - b.unit);
    }
  } else {
    // default sort newest first
    notes.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  }

  return notes;
}

export async function getNoteById(id) {
  await simulateDelay(150);
  const notes = getStoredNotes();
  return notes.find(n => n.id === id) || null;
}

export async function createNote(noteData) {
  await simulateDelay(350);
  const notes = getStoredNotes();
  const newNote = {
    ...noteData,
    id: `note-${Date.now()}`,
    uploadDate: new Date().toISOString().split('T')[0],
    downloads: 0,
    status: noteData.status || 'published',
    pages: noteData.pages || Math.floor(Math.random() * 30) + 15,
    pdfUrl: noteData.pdfUrl || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  };
  notes.unshift(newNote);
  saveStoredNotes(notes);
  return newNote;
}

export async function updateNote(id, noteData) {
  await simulateDelay(300);
  const notes = getStoredNotes();
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Note not found');

  notes[index] = { ...notes[index], ...noteData };
  saveStoredNotes(notes);
  return notes[index];
}

export async function deleteNote(id) {
  await simulateDelay(250);
  const notes = getStoredNotes();
  const filtered = notes.filter(n => n.id !== id);
  saveStoredNotes(filtered);
  return true;
}

export async function updateNoteStatus(id, newStatus) {
  await simulateDelay(200);
  const notes = getStoredNotes();
  const note = notes.find(n => n.id === id);
  if (!note) throw new Error('Note not found');
  note.status = newStatus;
  saveStoredNotes(notes);
  return note;
}

export async function incrementDownloads(id) {
  const notes = getStoredNotes();
  const note = notes.find(n => n.id === id);
  if (note) {
    note.downloads = (note.downloads || 0) + 1;
    saveStoredNotes(notes);
    return note.downloads;
  }
  return 0;
}
