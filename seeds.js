// js/seeds.js — Seed guide page
// toggleMenu() is defined in api.js (shared)

let allSeeds = [];

async function loadSeeds() {
  allSeeds = await apiGetSeeds();
  renderTable(allSeeds);
  renderCareCards(allSeeds);
}

function renderTable(list) {
  const tbody = document.getElementById('seedTableBody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--muted)">No results found.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(s => `
    <tr>
      <td><div class="seed-crop-cell">
        <span class="seed-crop-emoji">${s.image}</span>
        <div>
          <div class="seed-crop-name">${s.crop_name}</div>
          <div class="seed-type-tag">${s.type}</div>
        </div>
      </div></td>
      <td>${s.type}</td>
      <td class="mono">${s.sowing_depth_cm} cm</td>
      <td class="mono">${s.seed_rate_kg_per_acre}</td>
      <td class="mono">${s.germination_days} days</td>
      <td class="mono">${s.spacing_cm}</td>
      <td>${s.season.map(se=>`<span class="tag" style="font-size:0.6rem">${se}</span>`).join(' ')}</td>
    </tr>`).join('');
}

function renderCareCards(list) {
  const grid = document.getElementById('careGrid');
  grid.innerHTML = list.map(s => `
    <div class="care-card">
      <div class="care-card-header">
        <span class="care-card-emoji">${s.image}</span>
        <div>
          <div class="care-card-name">${s.crop_name}</div>
          <div class="care-card-cat">${s.category ? s.category.replace('_',' ') : ''}</div>
        </div>
      </div>
      <ul class="care-tips-list-sm">
        ${(s.care_tips || []).map(t=>`<li>${t}</li>`).join('')}
      </ul>
    </div>`).join('');
}

function filterSeeds() {
  const q        = document.getElementById('seedSearch').value.toLowerCase();
  const category = document.getElementById('seedCategory').value;
  const season   = document.getElementById('seedSeason').value;
  let r = allSeeds;
  if (q)        r = r.filter(s => s.crop_name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q));
  if (category) r = r.filter(s => s.category === category);
  if (season)   r = r.filter(s => s.season && s.season.includes(season));
  renderTable(r);
}

loadSeeds();
