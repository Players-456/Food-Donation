// client/src/components/ProtectedRoute.js

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Token nahi hai → Login pe bhejo
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Role allowed nahi hai → Apne dashboard pe bhejo
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "donor")     return <Navigate to="/dashboard" replace />;
    if (user.role === "ngo")       return <Navigate to="/ngo-dashboard" replace />;
    if (user.role === "volunteer") return <Navigate to="/volunteer-dashboard" replace />;
    if (user.role === "admin")     return <Navigate to="/admin-dashboard" replace />;
  }

  // ✅ Sab sahi hai → Page dikhao
  return children;
}

export default ProtectedRoute;