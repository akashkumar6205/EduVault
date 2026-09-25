import { mockUsers } from '../data/mockUsers';

const STUDENT_SESSION_KEY = 'eduvault_student_session';
const ADMIN_SESSION_KEY = 'eduvault_admin_session';

const simulateDelay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Student Auth
export async function studentLogin(email, password) {
  await simulateDelay(250);
  const student = mockUsers.students.find(s => s.email.toLowerCase() === email.toLowerCase());

  if (!student) {
    throw new Error('Invalid email or password');
  }

  // Check password (for mock prototype, simple comparison)
  if (student.password && student.password !== password && password !== 'password123') {
    throw new Error('Invalid email or password');
  }

  const sessionData = {
    id: student.id,
    name: student.name,
    email: student.email,
    role: 'student',
    college: student.college,
    branch: student.branch,
    semester: student.semester,
    avatar: student.avatar,
    token: `mock-jwt-student-${Date.now()}`
  };

  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(sessionData));
  return sessionData;
}

export async function studentRegister(userData) {
  await simulateDelay(300);
  // Ensure required fields
  if (!userData.email || !userData.name || !userData.password) {
    throw new Error('Please fill in all required fields');
  }

  const existing = mockUsers.students.find(s => s.email.toLowerCase() === userData.email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists');
  }

  const newStudent = {
    id: `usr-std-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'student', // PRD rule: all self-registered users are strictly students
    college: userData.college || 'Engineering College',
    branch: userData.branch || 'CSE',
    semester: userData.semester || 1,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
    joinedDate: new Date().toISOString().split('T')[0],
    bookmarks: [],
    recentViews: []
  };

  mockUsers.students.push(newStudent);

  const sessionData = {
    id: newStudent.id,
    name: newStudent.name,
    email: newStudent.email,
    role: 'student',
    college: newStudent.college,
    branch: newStudent.branch,
    semester: newStudent.semester,
    avatar: newStudent.avatar,
    token: `mock-jwt-student-${Date.now()}`
  };

  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(sessionData));
  return sessionData;
}

export function getCurrentStudent() {
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function studentLogout() {
  localStorage.removeItem(STUDENT_SESSION_KEY);
}

// Admin Auth (Completely isolated session)
export async function adminLogin(email, password) {
  await simulateDelay(300);
  const admin = mockUsers.admin;

  if (email.toLowerCase() !== admin.email.toLowerCase()) {
    throw new Error('Unauthorized administrative credentials');
  }

  if (password !== admin.password && password !== 'admin123') {
    throw new Error('Incorrect administrative password');
  }

  const sessionData = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: 'admin',
    department: admin.department,
    avatar: admin.avatar,
    token: `mock-jwt-admin-${Date.now()}`
  };

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
  return sessionData;
}

export function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
