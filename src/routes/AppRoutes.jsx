import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page with MainLayout (Navbar + Footer) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Landing />
          </MainLayout>
        }
      />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Placeholder Page */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Catch-All Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
