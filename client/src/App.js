// client/src/App.js

import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AddDonation from "./pages/AddDonation";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Helpline from "./pages/Helpline";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import { PageLoader } from "./components/UIComponents";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Page loader — hide after 1.8s
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <PageLoader show={loading} />
      <BrowserRouter>
        <Layout theme={theme} setTheme={setTheme} />
      </BrowserRouter>
    </>
  );
}

function Layout({ theme, setTheme }) {
  const location = useLocation();

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>

            {/* ── Public Routes ── */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/helpline" element={<Helpline />} />

            {/* ── Protected: Profile ── */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={["donor", "ngo", "volunteer", "admin"]}>
                <Profile />
              </ProtectedRoute>
            } />

            {/* ── Protected: Donor Only ── */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <DonorDashboard />
              </ProtectedRoute>
            } />

            <Route path="/add-donation" element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <AddDonation />
              </ProtectedRoute>
            } />

            {/* ── Protected: NGO Only ── */}
            <Route path="/ngo-dashboard" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <NGODashboard />
              </ProtectedRoute>
            } />

            {/* ── Protected: Volunteer Only ── */}
            <Route path="/volunteer-dashboard" element={
              <ProtectedRoute allowedRoles={["volunteer"]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            } />

            {/* ── Protected: Admin Only ── */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* ── Protected: Any Logged In User ── */}
            <Route path="/feedback" element={
              <ProtectedRoute allowedRoles={["donor", "ngo", "volunteer", "admin"]}>
                <Feedback />
              </ProtectedRoute>
            } />

            {/* ── 404 → Home ── */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;