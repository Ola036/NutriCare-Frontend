import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem('token') || null;

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}