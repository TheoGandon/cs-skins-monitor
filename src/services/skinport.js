export async function fetchSkins() {
  // In development we use the Vite dev-server proxy defined in vite.config.js
  // which proxies '/api/skinport' -> 'https://api.skinport.com/v1/items'.
  // This avoids CORS during development. In production you'll need a server-side
  // proxy or a deployed backend to avoid CORS if Skinport doesn't allow browser requests.
  const proxiedUrl = "/api/skinport?app_id=730&currency=EUR";

  const res = await fetch(proxiedUrl);
  if (!res.ok) {
    // try to include any textual error for easier debugging
    const text = await res.text().catch(() => null);
    throw new Error(`Skinport API error ${res.status}${text ? ': ' + text : ''}`);
  }

  return res.json();
}
