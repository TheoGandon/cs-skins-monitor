import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../services/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

// WARNING: hardcoding credentials is insecure and only suitable for
// local/testing. Do NOT commit real secrets. Prefer environment variables
// or a real authentication backend in production.
const HARDCODED_USER = "admin";
const HARDCODED_PASS = "secret123";

// Zod schema for login validation
const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      // Simple hardcoded check
      if (data.username !== HARDCODED_USER || data.password !== HARDCODED_PASS) {
        setError("root", { message: "Identifiants invalides" });
        return;
      }

      // Create a fake token containing the username for demo purposes
      const token = btoa(JSON.stringify({ user: data.username, t: Date.now() }));
      // simulate async
      await new Promise((r) => setTimeout(r, 300));
      login(token);

      // Redirect back to the page the user wanted, or to home
      const from =
        (location && location.state && location.state.from && location.state.from.pathname) || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("root", { message: "Échec de la connexion" });
    }
  }

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[500px] mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Connexion</h2>

        {/* Root error (invalid credentials, etc.) */}
        {errors.root && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
            {errors.root.message}
          </div>
        )}

        {/* Username field */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
}
