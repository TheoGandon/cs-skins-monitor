import React from "react";
import SkinCard from "./SkinCard";

export default function SkinList({ skins }) {
  if (!skins || skins.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Aucun résultat</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {skins.map((skin, index) => (
        <SkinCard key={`${skin.market_hash_name}-${index}`} skin={skin} />
      ))}
    </div>
  );
}
