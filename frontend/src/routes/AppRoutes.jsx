import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
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

      {/* Sign Up Page */}
      <Route path="/signup" element={<SignUp />} />

      {/* Student / Unified Dashboard Page */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ========================================================= */}
      {/* COMPANY PORTAL ROUTES (Replacing former Admin UI) */}
      {/* ========================================================= */}
      <Route
        path="/company"
        element={<Dashboard defaultRole="company" defaultTab="company_overview" />}
      />
      <Route
        path="/company/profile"
        element={<Dashboard defaultRole="company" defaultTab="company_profile" />}
      />
      <Route
        path="/company/jobs"
        element={<Dashboard defaultRole="company" defaultTab="company_jobs" />}
      />
      <Route
        path="/company/jobs/new"
        element={<Dashboard defaultRole="company" defaultTab="company_create_job" />}
      />
      <Route
        path="/company/applicants"
        element={<Dashboard defaultRole="company" defaultTab="company_applicants" />}
      />

      {/* Admin route aliased to Company Portal per Goal requirement */}
      <Route
        path="/admin"
        element={<Dashboard defaultRole="company" defaultTab="company_overview" />}
      />
      <Route path="/admin/*" element={<Navigate to="/company" replace />} />

      {/* Catch-All Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
