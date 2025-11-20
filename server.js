import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Import compatible pour node-fetch en CommonJS/ESM
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let cache = null;
let lastFetch = 0;

app.get("/api/skins", async (req, res) => {
  try {
    const now = Date.now();

    if (cache && now - lastFetch < 60000) {
      return res.json(cache);
    }

    const url = "https://api.skinport.com/v1/items?app_id=730&currency=EUR";
    const response = await fetch(url);

    if (!response.ok) {
        const text = await response.text();
        console.error(">>> SKINPORT ERROR RAW RESPONSE:");
        console.error(text);
        return res.status(500).json({ error: "Skinport ERROR", details: text });
    }


    const data = await response.json();

    cache = data;
    lastFetch = now;

    res.json(data);
  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ error: "Backend crashed" });
  }
});

app.listen(3000, () => console.log("Backend OK on http://localhost:3000"));
