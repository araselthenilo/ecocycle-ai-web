import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Dashboard from "@/pages/Dashboard"
import AIScanner from "@/pages/AIScanner"
import RecycleMap from "@/pages/RecycleMap"
import Leaderboard from "@/pages/Leaderboard"
import Profile from "@/pages/Profile"
import Notifications from "@/pages/Notifications"
import "./App.css"

// Fallback client ID if .env is not yet populated
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '000000000000-dummy.apps.googleusercontent.com';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Ensure only logged in users can see the dashboard
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Layout wrapper for dashboard views
function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePage = pathname.replace(/^\//, '') || 'dashboard';

  return (
    <SidebarProvider>
      <AppSidebar
        activePage={activePage}
        onNavigate={(page) => navigate(`/${page}`)}
      />

      <SidebarInset className="dashboard-inset">
        <Navbar activePage={activePage} />

        <main className="dashboard-content">
          {children}
        </main>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Landing Page: Default view when opening the website */}
            <Route path="/" element={<LandingPage />} />

            {/* Login / Auth Page: Matches Figma Frame 4:438 SAMA PERSIS */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/daftar" element={<LoginPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/scanner"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <AIScanner />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/recyclemap"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <RecycleMap />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Leaderboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Notifications />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/notifikasi" element={<Navigate to="/notifications" replace />} />

            {/* Catch-all fallback redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
