import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 heures plus tard
    localStorage.setItem('authToken', token);
    localStorage.setItem('expiry', expiryTime.toJSON());
    setAuthToken(token); // Mettre à jour l'état avec le nouveau token
  };
  
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiry');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiryStr = localStorage.getItem('expiry');

    if (!token || !expiryStr) {
      // no token stored
      logout();
      return;
    }

    const expiry = new Date(expiryStr);
    if (isNaN(expiry.getTime()) || expiry < new Date()) {
      logout(); // Déconnexion si le token est expiré or invalid
    } else {
      setAuthToken(token);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
