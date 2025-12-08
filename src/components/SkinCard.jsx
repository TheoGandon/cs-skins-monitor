import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function SkinCard({ skin }) {
  const encoded = encodeURIComponent(skin.market_hash_name);
  const { toggle, isFavorite } = useFavorites();

  const favorite = isFavorite(skin.market_hash_name);

  function onToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(skin.market_hash_name);
  }

  return (
    <Link to={`/skin/${encoded}`} state={{ skin }} className="block">
      <article className="relative p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col items-center hover:shadow-lg transition">
        <button
          onClick={onToggle}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={`absolute top-2 right-2 text-xl leading-none ${favorite ? "text-yellow-400" : "text-gray-300"}`}
        >
          {favorite ? "★" : "☆"}
        </button>

        <h2 className="text-lg font-semibold text-center">{skin.market_hash_name}</h2>
        <p className="text-blue-500 font-bold mt-2">
          {skin.min_price ? `${skin.min_price} €` : "N/A"}
        </p>
      </article>
    </Link>
  );
}
