import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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


function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Redirect to home if user is logged in */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipe-list" element={<RecipeList />} />


      {/* Private routes for authenticated users */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Navigation />
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </Router>
  );
}

export default App;
