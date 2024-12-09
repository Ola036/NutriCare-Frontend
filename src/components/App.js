import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from '../contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Home from './Home';
import Login from './User/Auth/Login';
import Register from './User/Auth/Register';
import ForgotPassword from './User/Auth/ForgotPassword';
import ResetPassword from './User/Auth/ResetPassword';
import Profile from './User/Profile';
import Recipes from './Recipes';
import RecipeList from './RecipeList';
import ChangePassword from './User/ChangePassword';  // Import the ChangePassword component
import Request2FA from './User/Request2FA';  // Import the Request2FA component
import Verify2FA from './User/Auth/Verify2FA';
import Verify from './User/Auth/Verify';

function AppRoutes() {
  const { user } = useUser();
  const location = useLocation();

  // Don't render Navigation on /2fa/confirm page
  const hideNavigation = ['/2fa/confirm', '/verify'].includes(location.pathname);

  return (
    <>
      {!hideNavigation && <Navigation />}
      <Routes>
        {/* Redirect to home if user is logged in */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe-list" element={<RecipeList />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/2fa/request" element={<Request2FA />} />
        <Route path="/2fa/confirm" element={<Verify2FA />} />

        {/* Private routes for authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </Router>
  );
}

export default App;
