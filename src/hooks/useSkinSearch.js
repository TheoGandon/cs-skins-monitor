import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSkins } from "../services/skinport";

export function useSkinSearch() {
  const [query, setQuery] = useState("");

  // Use react-query for fetching and caching
  const { data: allSkins = [], isLoading: loading, error } = useQuery({
    queryKey: ["skins"],
    queryFn: fetchSkins,
  });

  // Filter logic remains the same
  let filtered = [];
  if (!query.trim()) {
    filtered = Array.isArray(allSkins) ? allSkins.slice(0, 5) : [];
  } else {
    const lower = query.toLowerCase();
    const results = allSkins.filter((skin) =>
      skin.market_hash_name.toLowerCase().includes(lower)
    );
    filtered = results.slice(0, 5);
  }

  return {
    query,
    setQuery,
    filtered,
    loading,
    error: error ? error.message : null,
    allSkins,
  };
}
