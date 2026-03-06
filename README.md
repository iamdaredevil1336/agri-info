# 🌾 AgriSystem — Crop & Seed Management

Smart agricultural reference for Indian crops — covering seasons, soils, seeds, and growing guides.

---

## 🚀 How to Run

### Option 1: Open Directly (Simplest — No Server Needed)

`api.js` is set to **standalone mode** (`USE_LIVE_API = false`).  
Just open `index.html` in any browser — no installation required.

> Double-click `index.html` or drag it into Chrome/Firefox.

---

### Option 2: Local Node.js Server

```bash
npm install
node server.js
```

Then open → **http://localhost:3000**

> For live-reload during development: `npx nodemon server.js`

To switch to live API mode, set in `api.js`:
```js
const USE_LIVE_API = true;
const API_BASE_URL = 'https://your-deployed-url.vercel.app';
```

---

### Option 3: Deploy to Vercel (Free, Permanent URL)

```bash
npm install -g vercel
vercel
```

`vercel.json` is already included — just run the command and follow the prompts.

---

### Option 4: Deploy to Netlify (Drag & Drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project folder onto the page
3. Get your live URL instantly

`netlify.toml` is already included.

---

## 📁 File Structure

```
agrisystem/
├── index.html        ← Homepage
├── crops.html        ← Crop Explorer
├── seeds.html        ← Seed Guide
├── seasons.html      ← Season Calendar
├── soils.html        ← Soil Guide
├── style.css         ← Global styles
├── api.js            ← API layer (standalone + live modes)
├── main.js           ← Homepage logic
├── crops.js          ← Crops page logic
├── seeds.js          ← Seeds page logic
├── seasons.js        ← Seasons page logic
├── soils.js          ← Soils page logic
├── data.js           ← Full crop/season/soil dataset
├── server.js         ← Express REST API server
├── vercel.json       ← Vercel deployment config
├── netlify.toml      ← Netlify deployment config
└── package.json      ← Node dependencies
```

## 🌐 API Endpoints (when server is running)

| Endpoint | Description |
|---|---|
| `GET /api/crops` | All crops (supports `?season=`, `?soil=`, `?category=`, `?water=`) |
| `GET /api/crops/:id` | Single crop detail |
| `GET /api/seeds` | All seed info |
| `GET /api/seasons` | All seasons with crop counts |
| `GET /api/soils` | All soil types with matching crops |
| `GET /api/search?q=` | Full-text search |
