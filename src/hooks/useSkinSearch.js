import { useEffect, useState } from "react";
import { fetchSkins } from "../services/skinport";

export function useSkinSearch() {
  const [allSkins, setAllSkins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchSkins()
      .then((data) => {
        if (!mounted) return;
        setAllSkins(data);
        // Never expose more than 5 items in the UI to avoid excessive requests/429
        setFiltered(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Erreur réseau");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(allSkins.slice(0, 5));
      return;
    }

    const lower = query.toLowerCase();
    const results = allSkins.filter((skin) =>
      skin.market_hash_name.toLowerCase().includes(lower)
    );

    setFiltered(results.slice(0, 5));
  }, [query, allSkins]);

  return { query, setQuery, filtered, loading, error, allSkins };
}
