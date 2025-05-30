import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '@/hooks/useAuth';

const AuthContext = createContext(null);

export const AuthProviderWrapper = ({ children }) => {
  const auth = useAuthHook();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to consume the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProviderWrapper');
  }
  return context;
};

export default AuthContext;
