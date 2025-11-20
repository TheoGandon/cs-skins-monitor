export async function fetchSkins() {
  const res = await fetch("http://localhost:3000/api/skins");
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}
