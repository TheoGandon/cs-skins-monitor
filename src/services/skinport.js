export async function fetchSkins() {
  const res = await fetch("/api/skinport?app_id=730&currency=EUR")
;
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}
