import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ToastProvider } from './components/ui/Toast';
import Chatbot from './components/ui/Chatbot';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages for code splitting
const Landing = lazy(() => import('./pages/Landing'));
const EventDiscovery = lazy(() => import('./pages/EventDiscovery'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const TicketBooking = lazy(() => import('./pages/TicketBooking'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const VendorMarketplace = lazy(() => import('./pages/VendorMarketplace'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <p className="text-sm text-surface-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Auth pages - no layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Main app with layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/events" element={<EventDiscovery />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/booking/:id" element={<TicketBooking />} />
                  <Route path="/create-event" element={<CreateEvent />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/vendors" element={<VendorMarketplace />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/about" element={<AboutUs />} />
                </Route>
              </Routes>
              {/* Global Chatbot Widget */}
              <Chatbot />
            </Suspense>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
