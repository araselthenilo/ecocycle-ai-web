import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'ecocycle_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const saveUserSession = (userData, rememberMe = true) => {
    setUser(userData);
    try {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save session:', e);
    }
  };

  // Standard Email / Password login
  const login = async (email, password, rememberMe = true) => {
    setIsLoading(true);
    try {
      // Simulate network request latency
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const displayName = email.split('@')[0];
      const userData = {
        id: 'usr_' + Date.now(),
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        provider: 'email',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      saveUserSession(userData, rememberMe);
      return { success: true, user: userData };
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const loginWithGoogle = async (googleAccount = null, rememberMe = true) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const userData = googleAccount || {
        id: 'google_' + Date.now(),
        name: 'Pengguna EcoCycle',
        email: 'pengguna.ecocycle@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        provider: 'google',
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      saveUserSession(userData, rememberMe);
      return { success: true, user: userData };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
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
