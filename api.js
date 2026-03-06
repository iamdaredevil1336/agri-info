// ============================================================
//  AgriSystem — API Layer (js/api.js)
//  Works in TWO modes:
//  1. STANDALONE: Uses embedded data (no server needed)
//  2. LIVE:       Calls real API at API_BASE_URL
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
// Set USE_LIVE_API = true and set your deployed URL when ready
// Set to false to use embedded data (no server needed — works on Netlify/GitHub Pages)
const USE_LIVE_API   = false;
const API_BASE_URL   = 'https://agri-info-red.vercel.app';

// ── EMBEDDED DATA (used when USE_LIVE_API = false) ───────────
const _crops = [
  { id:1, name:"Wheat", image:"🌾", category:"cereal", season:["rabi","winter"], soil_types:["loamy","clay","alluvial"], climate:["cool","temperate"], water_requirement:"medium", sowing_months:["October","November","December"], harvest_months:["March","April"], duration_days:"120-150", description:"Wheat is a staple cereal crop grown in cool, dry climates. One of the most widely cultivated crops worldwide.", care_tips:["Irrigate 4–6 times during growing period","Apply nitrogen fertilizer at sowing and top-dress after 3 weeks","Watch for rust disease — use resistant varieties","Ensure well-drained soil to avoid waterlogging"], seeds:{ type:"Grain Seed", sowing_depth_cm:"5-7", seed_rate_kg_per_acre:"40-50 kg", germination_days:"7-10", spacing_cm:"20-22 (row)" } },
  { id:2, name:"Rice", image:"🍚", category:"cereal", season:["kharif","summer"], soil_types:["clay","alluvial","loamy"], climate:["hot","humid","tropical"], water_requirement:"high", sowing_months:["June","July"], harvest_months:["October","November"], duration_days:"120-160", description:"Rice is the most important food crop in Asia. Requires standing water during most of its growth period.", care_tips:["Maintain 5–10 cm standing water in fields","Transplant seedlings 25–30 days after nursery sowing","Top dress urea at tillering stage","Drain field 2 weeks before harvest"], seeds:{ type:"Paddy Seed", sowing_depth_cm:"2-3 (nursery)", seed_rate_kg_per_acre:"8-10 kg", germination_days:"5-8", spacing_cm:"20×15 transplanted" } },
  { id:3, name:"Maize", image:"🌽", category:"cereal", season:["kharif","summer"], soil_types:["loamy","sandy-loam","alluvial"], climate:["warm","tropical","subtropical"], water_requirement:"medium", sowing_months:["June","July","February"], harvest_months:["September","October"], duration_days:"90-110", description:"Maize is a versatile crop used for food, fodder, and industrial products. Grows best in warm, well-drained soils.", care_tips:["Sow seeds on ridges or raised beds","Irrigate at knee-high and silking stage","Apply balanced NPK fertilizer","Control stem borer with appropriate pesticide"], seeds:{ type:"Hybrid / Open-Pollinated", sowing_depth_cm:"4-5", seed_rate_kg_per_acre:"8-10 kg", germination_days:"6-10", spacing_cm:"60×25" } },
  { id:4, name:"Cotton", image:"🪴", category:"cash_crop", season:["kharif","summer"], soil_types:["black","clay","deep-loam"], climate:["hot","tropical","subtropical"], water_requirement:"medium", sowing_months:["April","May","June"], harvest_months:["October","November","December"], duration_days:"150-180", description:"Cotton is a major cash crop grown for its fiber. Thrives in hot climates with deep, well-drained soils.", care_tips:["Sow after last frost when soil is warm","Thin to 1 plant per hill after germination","Monitor for bollworm and whitefly","Reduce irrigation at boll maturity"], seeds:{ type:"Hybrid / Bt Cotton", sowing_depth_cm:"3-5", seed_rate_kg_per_acre:"1-1.5 kg", germination_days:"7-10", spacing_cm:"90×60" } },
  { id:5, name:"Tomato", image:"🍅", category:"vegetable", season:["rabi","kharif","winter","summer"], soil_types:["loamy","sandy-loam","alluvial"], climate:["warm","temperate"], water_requirement:"medium", sowing_months:["June","July","October","November"], harvest_months:["September","October","January","February"], duration_days:"60-80", description:"Tomato is one of the most popular vegetable crops. Can be grown in multiple seasons, rich in vitamins.", care_tips:["Start seeds in nursery trays 30 days before transplanting","Stake plants when 30 cm tall","Irrigate regularly — avoid waterlogging","Spray fungicide to prevent early blight"], seeds:{ type:"Hybrid Vegetable Seed", sowing_depth_cm:"0.5-1", seed_rate_kg_per_acre:"0.1-0.15 kg", germination_days:"5-7", spacing_cm:"75×60" } },
  { id:6, name:"Sugarcane", image:"🎋", category:"cash_crop", season:["annual"], soil_types:["loamy","clay","alluvial"], climate:["tropical","subtropical","hot"], water_requirement:"high", sowing_months:["February","March","October"], harvest_months:["November","December","January"], duration_days:"300-360", description:"Sugarcane is the primary source of sugar and ethanol. Long-duration crop requiring high water input.", care_tips:["Use healthy 2-3 budded setts for planting","Provide earthing up at 90 days","Irrigate every 10–15 days","Control top borer during early growth"], seeds:{ type:"Stem Cuttings (Setts)", sowing_depth_cm:"10-15", seed_rate_kg_per_acre:"2500-3000 setts", germination_days:"15-21", spacing_cm:"90×30" } },
  { id:7, name:"Potato", image:"🥔", category:"vegetable", season:["rabi","winter"], soil_types:["sandy-loam","loamy","alluvial"], climate:["cool","temperate"], water_requirement:"medium", sowing_months:["October","November"], harvest_months:["January","February","March"], duration_days:"80-110", description:"Potato is a major vegetable crop grown in cool weather. Grown from tubers and rich in carbohydrates.", care_tips:["Use certified, disease-free seed tubers","Hill up soil around plants at 30 days","Irrigate every 7–10 days","Spray fungicide to prevent late blight"], seeds:{ type:"Seed Tubers", sowing_depth_cm:"8-10", seed_rate_kg_per_acre:"500-600 kg", germination_days:"14-21", spacing_cm:"60×20" } },
  { id:8, name:"Sunflower", image:"🌻", category:"oilseed", season:["kharif","rabi","summer"], soil_types:["loamy","sandy-loam","black"], climate:["warm","temperate","cool"], water_requirement:"low", sowing_months:["June","July","October","January"], harvest_months:["September","October","March"], duration_days:"90-100", description:"Sunflower is an important oilseed crop that can be grown in multiple seasons. Drought-tolerant and adaptable.", care_tips:["Sow 2 seeds per hill, thin to 1 after germination","Apply boron micronutrient to improve seed setting","Irrigate at flowering and seed-filling stages","Protect from birds during seed filling"], seeds:{ type:"Hybrid Oilseed", sowing_depth_cm:"3-5", seed_rate_kg_per_acre:"2-2.5 kg", germination_days:"6-8", spacing_cm:"60×30" } },
  { id:9, name:"Chickpea", image:"🫘", category:"pulse", season:["rabi","winter"], soil_types:["loamy","sandy-loam","black"], climate:["cool","dry","temperate"], water_requirement:"low", sowing_months:["October","November"], harvest_months:["February","March"], duration_days:"100-120", description:"Chickpea is a drought-tolerant pulse crop that fixes nitrogen in the soil. Rich source of protein.", care_tips:["Treat seeds with Rhizobium culture before sowing","Avoid excess irrigation — 1–2 irrigations sufficient","Monitor for pod borer at flowering","Harvest when leaves turn yellow and pods are dry"], seeds:{ type:"Pulse Seed", sowing_depth_cm:"5-8", seed_rate_kg_per_acre:"30-35 kg", germination_days:"8-12", spacing_cm:"30×10" } },
  { id:10, name:"Mango", image:"🥭", category:"fruit", season:["perennial"], soil_types:["loamy","alluvial","laterite"], climate:["tropical","subtropical","hot"], water_requirement:"low", sowing_months:["July","August"], harvest_months:["April","May","June"], duration_days:"1800+ (5 yrs)", description:"Mango is the king of fruits and a major horticultural crop. Grafted plants bear fruit in 3–4 years.", care_tips:["Use grafted plants for early and reliable fruiting","Apply farmyard manure in July–August every year","Irrigate young trees weekly; mature trees before flowering","Prune dead wood after harvest"], seeds:{ type:"Grafted Sapling", sowing_depth_cm:"10-15", seed_rate_kg_per_acre:"16-20 plants", germination_days:"14-21", spacing_cm:"1000×1000 (10m)" } },
  { id:11, name:"Onion", image:"🧅", category:"vegetable", season:["rabi","kharif"], soil_types:["loamy","sandy-loam","alluvial"], climate:["cool","temperate","warm"], water_requirement:"medium", sowing_months:["October","November","June"], harvest_months:["February","March","September"], duration_days:"100-120", description:"Onion is one of the most important commercial vegetable crops used worldwide as a condiment and vegetable.", care_tips:["Transplant 6-week-old nursery seedlings","Irrigate every 7-10 days; stop 10 days before harvest","Apply potassium for better bulb development","Control thrips with neem oil spray"], seeds:{ type:"Bulb Seed / Sets", sowing_depth_cm:"1-2", seed_rate_kg_per_acre:"3-4 kg", germination_days:"8-12", spacing_cm:"15×10" } },
  { id:12, name:"Groundnut", image:"🥜", category:"oilseed", season:["kharif","summer"], soil_types:["sandy-loam","loamy","red"], climate:["warm","tropical","subtropical"], water_requirement:"medium", sowing_months:["June","July","January"], harvest_months:["September","October","April"], duration_days:"100-130", description:"Groundnut is a major oilseed and food crop. It fixes atmospheric nitrogen and improves soil fertility.", care_tips:["Shell seeds just before sowing for best germination","Earthing up is essential for pod development","Avoid waterlogging — causes collar rot","Apply gypsum at pegging stage for calcium"], seeds:{ type:"Oilseed (Kernel)", sowing_depth_cm:"4-6", seed_rate_kg_per_acre:"50-60 kg", germination_days:"7-10", spacing_cm:"30×10" } }
];

const _seasons = [
  { id:"kharif",    label:"Kharif",    months:"June – October",  emoji:"🌧️", description:"Monsoon / summer crops sown at onset of rains" },
  { id:"rabi",      label:"Rabi",      months:"Oct – March",     emoji:"❄️", description:"Winter crops sown after monsoon withdrawal" },
  { id:"summer",    label:"Summer",    months:"Feb – June",      emoji:"☀️", description:"Short-duration warm-season crops" },
  { id:"annual",    label:"Annual",    months:"Year-round",      emoji:"📅", description:"Long-duration crops grown for a full year" },
  { id:"perennial", label:"Perennial", months:"Multi-year",      emoji:"🌳", description:"Trees and long-term horticultural crops" }
];

const _soils = [
  { id:"alluvial",   label:"Alluvial Soil", emoji:"🟤", description:"Fertile, found in river plains. Best for most crops." },
  { id:"black",      label:"Black Soil",    emoji:"⚫", description:"Rich in clay, retains moisture. Ideal for cotton." },
  { id:"loamy",      label:"Loamy Soil",    emoji:"🟫", description:"Balanced texture, best all-purpose agricultural soil." },
  { id:"sandy-loam", label:"Sandy Loam",    emoji:"🟡", description:"Well-draining, good for root vegetables and pulses." },
  { id:"clay",       label:"Clay Soil",     emoji:"🔵", description:"Heavy, water-retentive. Good for paddy and sugarcane." },
  { id:"laterite",   label:"Laterite Soil", emoji:"🔴", description:"Iron-rich, acidic. Suited for mangoes and cashews." }
];

// ── API FUNCTIONS ────────────────────────────────────────────
async function apiGetCrops(filters = {}) {
  if (USE_LIVE_API) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/api/crops?${params}`);
    const json = await res.json();
    return json.success ? json.data : [];
  }
  return localFilterCrops(filters);
}

async function apiGetCropById(id) {
  if (USE_LIVE_API) {
    const res = await fetch(`${API_BASE_URL}/api/crops/${id}`);
    const json = await res.json();
    return json.success ? json.data : null;
  }
  return _crops.find(c => c.id === parseInt(id)) || null;
}

async function apiGetSeeds(filters = {}) {
  if (USE_LIVE_API) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/api/seeds?${params}`);
    const json = await res.json();
    return json.success ? json.data : [];
  }
  return localFilterCrops(filters).map(c => ({
    crop_id: c.id, crop_name: c.name, image: c.image,
    category: c.category, season: c.season, care_tips: c.care_tips, ...c.seeds
  }));
}

async function apiGetSeasons() {
  if (USE_LIVE_API) {
    const res = await fetch(`${API_BASE_URL}/api/seasons`);
    const json = await res.json();
    return json.success ? json.data : [];
  }
  return _seasons.map(s => ({
    ...s,
    crops_count: _crops.filter(c => c.season.includes(s.id)).length,
    crops: _crops.filter(c => c.season.includes(s.id)).map(c => ({ id: c.id, name: c.name, image: c.image }))
  }));
}

async function apiGetSoils() {
  if (USE_LIVE_API) {
    const res = await fetch(`${API_BASE_URL}/api/soils`);
    const json = await res.json();
    return json.success ? json.data : [];
  }
  return _soils.map(s => ({
    ...s,
    crops: _crops.filter(c => c.soil_types.includes(s.id)).map(c => ({ id: c.id, name: c.name, image: c.image, category: c.category }))
  }));
}

// Local filter helper
function localFilterCrops(q = {}) {
  let r = [..._crops];
  if (q.season)   r = r.filter(c => c.season.some(s  => s.toLowerCase()  === q.season.toLowerCase()));
  if (q.soil)     r = r.filter(c => c.soil_types.some(s => s.toLowerCase() === q.soil.toLowerCase()));
  if (q.climate)  r = r.filter(c => c.climate.some(cl => cl.toLowerCase() === q.climate.toLowerCase()));
  if (q.water)    r = r.filter(c => c.water_requirement.toLowerCase() === q.water.toLowerCase());
  if (q.category) r = r.filter(c => c.category.toLowerCase() === q.category.toLowerCase());
  if (q.search) {
    const t = q.search.toLowerCase();
    r = r.filter(c => c.name.toLowerCase().includes(t) || c.description.toLowerCase().includes(t) || c.category.toLowerCase().includes(t));
  }
  return r;
}

// ── SHARED UI FUNCTIONS (available on every page) ───────────

// Theme toggle with localStorage persistence
(function initTheme() {
  const saved = localStorage.getItem('agri-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', next);
  }
  localStorage.setItem('agri-theme', next);
}

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Modal close (shared)
function closeModal() {
  const ov = document.getElementById('modalOverlay');
  if (ov) ov.classList.remove('open');
}

// Back-to-top button
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
});

// Scroll-reveal: elements with .reveal fade+slide in when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  // Tag all major sections for reveal
  document.querySelectorAll(
    '.feature-card, .crop-card, .season-card, .soil-card, .care-card, .section-title, .filter-bar, .seed-table-wrap, .hero-stats .stat'
  ).forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Stagger crop cards
  document.querySelectorAll('.crop-cards-grid').forEach(grid => {
    const mo = new MutationObserver(() => {
      grid.querySelectorAll('.crop-card').forEach((c, i) => { c.style.animationDelay = `${i * 0.06}s`; });
    });
    mo.observe(grid, { childList: true });
  });
});
