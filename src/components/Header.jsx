import React from "react";
import { useAuth } from "../services/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ title = "Recherche de skins CS2" }) {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div>
        {authToken ? (
          <button onClick={onLogout} className="text-sm text-red-500">
            Déconnexion
          </button>
        ) : (
          <Link to="/login" className="text-sm text-blue-500">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}
