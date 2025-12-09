import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../services/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { authToken } = useAuth();

  // If already authenticated, redirect to home
  if (authToken) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <LoginForm />
    </div>
  );
}
