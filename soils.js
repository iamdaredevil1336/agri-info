// js/soils.js — Soil guide page
// toggleMenu() is defined in api.js (shared)

async function loadSoils() {
  const soils = await apiGetSoils();
  const grid = document.getElementById('soilGrid');
  grid.innerHTML = soils.map(s => `
    <div class="soil-card">
      <div class="soil-header">
        <span class="soil-emoji">${s.emoji}</span>
        <div class="soil-name">${s.label}</div>
      </div>
      <div class="soil-desc">${s.description}</div>
      <div class="soil-crops-label">Suitable Crops (${s.crops.length})</div>
      <div class="soil-crops-row">
        ${s.crops.map(c=>`<span class="soil-crop-chip">${c.image} ${c.name}</span>`).join('')}
      </div>
    </div>`).join('');
}

loadSoils();
