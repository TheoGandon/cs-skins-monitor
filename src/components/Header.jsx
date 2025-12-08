import React from "react";

export default function Header({ title = "Recherche de skins CS2" }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
}
