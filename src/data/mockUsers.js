export const mockUsers = {
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Sarah Mitchell',
    email: 'admin@eduvault.edu',
    password: 'admin', // for prototype testing
    role: 'admin',
    department: 'Academic Affairs / Computer Science',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2025-01-10'
  },
  students: [
    {
      id: 'usr-std-01',
      name: 'Priya Sharma',
      email: 'priya.s@student.edu',
      password: 'password123',
      role: 'student',
      college: 'National Institute of Technology',
      branch: 'CSE',
      semester: 3,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2026-01-15',
      bookmarks: ['note-01', 'note-03', 'note-06'],
      recentViews: ['note-01', 'note-02', 'note-05', 'note-07']
    },
    {
      id: 'usr-std-02',
      name: 'Rahul Verma',
      email: 'rahul.v@student.edu',
      password: 'password123',
      role: 'student',
      college: 'Delhi Technological University',
      branch: 'CSE',
      semester: 4,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2026-02-01',
      bookmarks: ['note-04', 'note-05'],
      recentViews: ['note-04', 'note-03']
    },
    {
      id: 'usr-std-03',
      name: 'Ananya Iyer',
      email: 'ananya.i@student.edu',
      password: 'password123',
      role: 'student',
      college: 'BITS Pilani',
      branch: 'ECE',
      semester: 3,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2026-02-14',
      bookmarks: ['note-10', 'note-11'],
      recentViews: ['note-10']
    },
    {
      id: 'usr-std-04',
      name: 'Karthik Nair',
      email: 'karthik.n@student.edu',
      password: 'password123',
      role: 'student',
      college: 'IIT Madras',
      branch: 'MECH',
      semester: 3,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2026-03-01',
      bookmarks: ['note-13'],
      recentViews: ['note-13', 'note-14']
    },
    {
      id: 'usr-std-05',
      name: 'Sneha Patel',
      email: 'sneha.p@student.edu',
      password: 'password123',
      role: 'student',
      college: 'Vellore Institute of Technology',
      branch: 'EEE',
      semester: 4,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2026-03-10',
      bookmarks: ['note-16'],
      recentViews: ['note-16']
    }
  ]
};
