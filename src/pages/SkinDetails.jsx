import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { fetchSkins } from "../services/skinport";

function FieldRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
      <div className="font-medium text-right">{String(value)}</div>
    </div>
  );
}

export default function SkinDetails() {
  const { encodedName } = useParams();
  const location = useLocation();
  const passed = location.state && location.state.skin;

  const [skin, setSkin] = useState(passed || null);
  const [loading, setLoading] = useState(!passed);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (skin || !encodedName) return;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetchSkins()
      .then((data) => {
        if (!mounted) return;
        const name = decodeURIComponent(encodedName);
        const found = Array.isArray(data)
          ? data.find((s) => s.market_hash_name === name)
          : null;
        if (found) setSkin(found);
        else setError("Détail introuvable pour cet item");
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Erreur réseau");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [encodedName, skin]);

  if (loading) return <Loading />;
  if (error) return <EmptyState message={`Erreur: ${error}`} />;
  if (!skin) return <EmptyState message="Aucun détail" />;

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{skin.market_hash_name}</h1>
          <Link to="/" className="text-sm text-blue-500">Retour</Link>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-6">
          <FieldRow label="Suggested price" value={skin.suggested_price ?? "N/A"} />
          <FieldRow label="Min price" value={skin.min_price ?? "N/A"} />
          <FieldRow label="Max price" value={skin.max_price ?? "N/A"} />
          <FieldRow label="Mean price" value={skin.mean_price ?? "N/A"} />
          <FieldRow label="Median price" value={skin.median_price ?? "N/A"} />
          <FieldRow label="Quantity" value={skin.quantity ?? "N/A"} />
          <FieldRow label="Created at" value={skin.created_at ?? "N/A"} />
          <FieldRow label="Updated at" value={skin.updated_at ?? "N/A"} />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="font-semibold mb-2">Liens</h2>
          <ul className="space-y-2">
            {skin.item_page && (
              <li>
                <a className="text-blue-500" href={skin.item_page} target="_blank" rel="noreferrer">
                  Voir la page article
                </a>
              </li>
            )}
            {skin.market_page && (
              <li>
                <a className="text-blue-500" href={skin.market_page} target="_blank" rel="noreferrer">
                  Voir le marché
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
