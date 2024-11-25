import React, { createContext, useContext, useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/constants';
import api from '../services/api';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api({
        url: ENDPOINTS.USER.PROFILE,
        method: 'GET',
        onSuccess: (data) => {
          setUser(data); // Ensure user object includes all required fields
        },
        onError: () => {
          setUser(null);
        },
        onEnd: () => {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}
