// Client-side caching to avoid repeated calls and reduce risk of 429.
// Strategy:
// - Use an in-memory cache for fast responses within the same tab.
// - Persist the cache in localStorage so other tabs can reuse recent results.
// - Keep a single in-flight promise per tab so concurrent callers share the same request.
// - TTL controls how long the cached result is considered fresh.

const LOCAL_KEY = "skinport_cache_v1";
let cache = null;
let lastFetch = 0;
let inFlight = null;
const TTL = 30 * 1000; // 30 seconds

function readLocalCache() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.ts || !parsed.data) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

function writeLocalCache(data) {
  try {
    const payload = { ts: Date.now(), data };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(payload));
  } catch (e) {
    // ignore storage errors
  }
}

export async function fetchSkins() {
  const now = Date.now();

  // return in-memory cache if fresh
  if (cache && now - lastFetch < TTL) return cache;

  // try localStorage cache
  const local = readLocalCache();
  if (local && now - local.ts < TTL) {
    cache = local.data;
    lastFetch = local.ts;
    return cache;
  }

  // if a request is already in flight, return the same promise
  if (inFlight) return inFlight;

  const proxiedUrl = "/api/skinport?app_id=730&currency=EUR";

  inFlight = fetch(proxiedUrl).then(async (res) => {
    inFlight = null;
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`Skinport API error ${res.status}${text ? ': ' + text : ''}`);
    }

    const data = await res.json();
    cache = data;
    lastFetch = Date.now();
    writeLocalCache(data);
    return data;
  }).catch((err) => {
    inFlight = null;
    throw err;
  });

  return inFlight;
}
