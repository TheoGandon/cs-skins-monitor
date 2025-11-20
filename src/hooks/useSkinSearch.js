import { useEffect, useState } from "react";
import { fetchSkins } from "../services/skinport";

export function useSkinSearch() {
  const [allSkins, setAllSkins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    fetchSkins()
      .then((data) => {
        setAllSkins(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(allSkins.slice(0, 40));
      return;
    }

    const lower = query.toLowerCase();
    const results = allSkins.filter((skin) =>
      skin.market_hash_name.toLowerCase().includes(lower)
    );

    setFiltered(results.slice(0, 5));
  }, [query, allSkins]);

  return { query, setQuery, filtered };
}
