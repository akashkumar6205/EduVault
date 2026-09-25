import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  studentLogin as apiStudentLogin,
  studentRegister as apiStudentRegister,
  getCurrentStudent,
  studentLogout as apiStudentLogout
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial student session
    const current = getCurrentStudent();
    if (current) {
      setStudent(current);
    } else {
      // For effortless initial prototype testing, auto-login Priya Sharma if no session exists
      const defaultStudent = {
        id: 'usr-std-01',
        name: 'Priya Sharma',
        email: 'priya.s@student.edu',
        role: 'student',
        college: 'National Institute of Technology',
        branch: 'CSE',
        semester: 3,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        token: 'mock-jwt-student-default'
      };
      localStorage.setItem('eduvault_student_session', JSON.stringify(defaultStudent));
      setStudent(defaultStudent);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = await apiStudentLogin(email, password);
    setStudent(user);
    return user;
  };

  const register = async (userData) => {
    const user = await apiStudentRegister(userData);
    setStudent(user);
    return user;
  };

  const logout = () => {
    apiStudentLogout();
    setStudent(null);
  };

  const updateProfile = (updatedFields) => {
    if (!student) return;
    const updated = { ...student, ...updatedFields };
    localStorage.setItem('eduvault_student_session', JSON.stringify(updated));
    setStudent(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
