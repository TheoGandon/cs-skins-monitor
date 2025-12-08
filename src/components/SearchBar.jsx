import React from "react";

export default function SearchBar({ query, setQuery, placeholder = "Rechercher un skin..." }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        aria-label="Rechercher"
      />
    </div>
  );
}
