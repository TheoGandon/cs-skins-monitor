import { useSkinSearch } from "./hooks/useSkinSearch";

export default function App() {
  const { query, setQuery, filtered } = useSkinSearch();

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Recherche de skins CS2</h1>

      <input
        type="text"
        placeholder="Rechercher un skin..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 mb-6 dark:bg-gray-800"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((skin, index) => (
          <div 
            key={`${skin.market_hash_name}-${index}`} 
            className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col items-center"
          >         
            <h2 className="text-lg font-semibold text-center">{skin.market_hash_name}</h2>
            <p className="text-blue-500 font-bold mt-2">
              {skin.min_price ? `${skin.min_price} €` : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
