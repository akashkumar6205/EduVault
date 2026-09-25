import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  adminLogin as apiAdminLogin,
  getCurrentAdmin,
  adminLogout as apiAdminLogout
} from '../services/authService';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentAdmin();
    if (current && current.role === 'admin') {
      setAdmin(current);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const adminUser = await apiAdminLogin(email, password);
    setAdmin(adminUser);
    return adminUser;
  };

  const logout = () => {
    apiAdminLogout();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAdminAuthenticated: !!admin && admin.role === 'admin',
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
