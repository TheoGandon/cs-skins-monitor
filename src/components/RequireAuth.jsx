import React from "react";
import { useAuth } from "../services/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { authToken } = useAuth();
  const location = useLocation();

  if (!authToken) {
    // Redirect to login, preserve location for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
