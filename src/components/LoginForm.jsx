import React, { useState } from "react";
import { useAuth } from "../services/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

// WARNING: hardcoding credentials is insecure and only suitable for
// local/testing. Do NOT commit real secrets. Prefer environment variables
// or a real authentication backend in production.
const HARDCODED_USER = "admin";
const HARDCODED_PASS = "secret123";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError("Veuillez saisir un nom d'utilisateur et un mot de passe");
      return;
    }

    // Simple hardcoded check
    if (username !== HARDCODED_USER || password !== HARDCODED_PASS) {
      setError("Identifiants invalides");
      return;
    }

    try {
      setLoading(true);
      // Create a fake token containing the username for demo purposes
      const token = btoa(JSON.stringify({ user: username, t: Date.now() }));
      // simulate async
      await new Promise((r) => setTimeout(r, 300));
      login(token);
      // Redirect back to the page the user wanted, or to home
      const from = (location && location.state && location.state.from && location.state.from.pathname) || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Échec de la connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit} className="w-[500px] mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter your username"
          />
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
}
