import React from "react";

export default function EmptyState({ message = "Aucun résultat" }) {
  return (
    <div className="py-8 text-center text-gray-600 dark:text-gray-300">{message}</div>
  );
}
