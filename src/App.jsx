import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProviderWrapper } from '@/contexts/AuthContext'; // Renamed for clarity

// Layouts
import MainLayout from '@/components/layouts/MainLayout';
import AdminLayout from '@/components/layouts/AdminLayout';

// Public Pages
import HomePage from '@/pages/public/HomePage';
import PortfolioPage from '@/pages/public/PortfolioPage';
import AboutPage from '@/pages/public/AboutPage';
import ContactPage from '@/pages/public/ContactPage';
import ProjectDetailPage from '@/pages/public/ProjectDetailPage';

// Admin Pages
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminSigninPage from '@/pages/admin/AdminSigninPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminBookingsPage from '@/pages/admin/AdminBookingsPage';
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminProfilePage from '@/pages/admin/AdminProfilePage';

import { useAuth } from '@/hooks/useAuth'; // Actual auth hook

function AdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You can show a global loader here if preferred
    return <div>Verificando autenticação...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <AuthProviderWrapper>
      <SettingsProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<PortfolioPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/signin" element={<AdminSigninPage />} />
            
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </SettingsProvider>
    </AuthProviderWrapper>
  );
}

export default App;