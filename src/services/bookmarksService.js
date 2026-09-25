import { mockNotes } from '../data/mockNotes';

const STORAGE_KEY = 'eduvault_bookmarks';

function getStoredBookmarks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Storage read error:', e);
  }
  // Default fallback bookmarks for demo student usr-std-01
  return {
    'usr-std-01': ['note-01', 'note-03', 'note-06'],
    'usr-std-02': ['note-04', 'note-05']
  };
}

function saveStoredBookmarks(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

const simulateDelay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBookmarks(userId) {
  await simulateDelay(150);
  if (!userId) return [];
  const map = getStoredBookmarks();
  const noteIds = map[userId] || [];
  
  // Fetch actual note objects
  const rawNotes = localStorage.getItem('eduvault_notes');
  const allNotes = rawNotes ? JSON.parse(rawNotes) : mockNotes;

  return allNotes.filter(n => noteIds.includes(n.id));
}

export async function isBookmarked(userId, noteId) {
  if (!userId) return false;
  const map = getStoredBookmarks();
  const userList = map[userId] || [];
  return userList.includes(noteId);
}

export async function toggleBookmark(userId, noteId) {
  await simulateDelay(150);
  if (!userId) throw new Error('User must be logged in to bookmark notes');

  const map = getStoredBookmarks();
  const userList = map[userId] || [];

  const exists = userList.includes(noteId);
  if (exists) {
    map[userId] = userList.filter(id => id !== noteId);
  } else {
    map[userId] = [...userList, noteId];
  }

  saveStoredBookmarks(map);
  return !exists; // returns new bookmarked state
}
