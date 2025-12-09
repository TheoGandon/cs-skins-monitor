import { useSkinSearch } from "./hooks/useSkinSearch";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SkinList from "./components/SkinList";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";
import Favorites from "./components/Favorites";
import { useFavorites } from "./hooks/useFavorites";



export default function App() {
  const { query, setQuery, filtered, loading, error, allSkins } = useSkinSearch();
  const { items: favoriteNames } = useFavorites();

  // Map favorite names to full skin objects (if available)
  const favoriteSkins = (favoriteNames || [])
    .map((name) => allSkins.find((s) => s.market_hash_name === name))
    .filter(Boolean);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Header />

      {favoriteSkins && favoriteSkins.length > 0 && (
        <Favorites skins={favoriteSkins} />
      )}

      <SearchBar query={query} setQuery={setQuery} />

      {loading ? (
        <Loading />
      ) : error ? (
        <EmptyState message={`Erreur: ${error}`} />
      ) : filtered && filtered.length > 0 ? (
        <SkinList skins={filtered} />
      ) : (
        <EmptyState message="Aucun skin trouvé" />
      )}
    </div>
  );
}
