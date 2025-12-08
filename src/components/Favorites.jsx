import React from "react";
import SkinList from "./SkinList";

export default function Favorites({ skins }) {
  if (!skins || skins.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Favoris</h2>
      <SkinList skins={skins} />
    </section>
  );
}
