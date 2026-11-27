// NusaStats views: one renderer per page. Each returns an HTML string
// for #page; main.js wires the controls after the HTML is in place.
import {
  COUNTRY, SOURCES, POPULATION_SERIES, GDP_GROWTH_SERIES, GDP_LEVEL_SERIES,
  INFLATION_SERIES, HEADLINES, SECTORS, TRADE, AGE_STRUCTURE, PEOPLE,
  ISLANDS, PROVINCES, formatMillions, formatPeople,
} from "./data.js";
import { lineChart, barChart, hbarChart, donutChart } from "./charts.js";

function kpiCard(h) {
  return `<article class="kpi"><p class="kpi-label">${h.label}</p>
    <p class="kpi-value">${h.value}</p>
    <p class="kpi-note">${h.note} · ${h.source}</p></article>`;
}

function sourceLine(text) {
  return `<p class="src">Source: ${text}</p>`;
}

function exploreCard(href, title, body) {
  return `<a class="explore" href="${href}"><h3>${title}</h3><p>${body}</p><span>Open →</span></a>`;
}

export function renderOverview(state) {
  const popChart = state.popView === "bars"
    ? barChart(POPULATION_SERIES, { label: "Population of Indonesia, 2015–2024, millions", unit: "m" })
    : lineChart(POPULATION_SERIES, { label: "Population of Indonesia, 2015–2024, millions", ymin: 240 });
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · ${COUNTRY.name}</p>
    <h1>${COUNTRY.name} in numbers</h1>
    <p class="lede">Population, economy, people and regions — the figures a visitor
    needs, each with its source and year, in one place. No sign-in, no tracking, no network: every number on this site ships with the page.</p>
    <p class="hero-facts"><strong>${COUNTRY.areaKm2.toLocaleString("en-US")} km²</strong> land area ·
    <strong>${COUNTRY.islands.toLocaleString("en-US")}</strong> islands ·
    <strong>${COUNTRY.provinces}</strong> provinces ·
    Capital <strong>${COUNTRY.capital}</strong></p>
  </section>
  <section class="kpis" aria-label="Headline indicators">
    ${HEADLINES.map(kpiCard).join("")}
  </section>
  <section class="panel">
    <div class="panel-head"><div><h2>Population keeps growing — slowly</h2>
    <p>Mid-year population, 2015–2024, in millions. Growth has eased from about 1.2% a year to about 1.0%.</p></div>
    <div class="toggle" role="group" aria-label="Chart type">
      <button data-popview="line" class="${state.popView === "line" ? "on" : ""}" aria-pressed="${state.popView === "line"}">Line</button>
      <button data-popview="bars" class="${state.popView === "bars" ? "on" : ""}" aria-pressed="${state.popView === "bars"}">Bars</button>
    </div></div>
    <div id="pop-chart">${popChart}</div>
    ${sourceLine("World Bank, World Development Indicators, 2015–2024.")}
  </section>
  <section class="panel">
    <div class="panel-head"><div><h2>Growth bounced back, then settled near 5%</h2>
    <p>Real GDP growth after the 2020 pandemic contraction: 5.3% in 2022, 5.1% in 2023, 5.0% in 2024.</p></div></div>
    ${barChart(GDP_GROWTH_SERIES, { label: "Real GDP growth, 2019–2024, percent", unit: "pct" })}
    ${sourceLine("BPS (Statistics Indonesia), national accounts.")}
  </section>
  <section>
    <h2>Explore the numbers</h2>
    <div class="explore-grid">
      ${exploreCard("#/economy", "Economy", "GDP, growth, what the country makes and sells, and prices.")}
      ${exploreCard("#/people", "People", "Who lives here: provinces, age, health and the internet.")}
      ${exploreCard("#/regions", "Regions", "Where people live — six island groups and 38 provinces.")}
      ${exploreCard("#/methods", "Sources & methods", "Where every figure comes from, and what is rounded.")}
    </div>
  </section>`;
}

export function renderEconomy(state) {
  const tab = state.econTab || "growth";
  const donut = donutChart(SECTORS, { label: "Share of GDP by sector, 2024" });
  const panels = {
    growth: `<h2>Growth and size</h2>
      <p>GDP reached <strong>$1,396 billion</strong> in 2024 (World Bank), up from $1,059 billion in the pandemic year 2020. GDP per capita was <strong>$4,925</strong> in 2024.</p>
      ${lineChart(GDP_LEVEL_SERIES, { label: "GDP in current US dollars, 2019–2024", unit: "usd-b", ymin: 900 })}
      ${sourceLine("World Bank, World Development Indicators.")}
      <h3>Real growth, % per year</h3>
      ${barChart(GDP_GROWTH_SERIES, { label: "Real GDP growth, 2019–2024, percent", unit: "pct" })}
      ${sourceLine("BPS, national accounts.")}
      <h3>Prices stayed calm after 2022</h3>
      <p>Consumer-price inflation spiked to 5.5% in 2022, then fell to 2.6% in 2023 and 1.6% in 2024.</p>
      ${lineChart(INFLATION_SERIES, { label: "Consumer-price inflation, 2019–2024, percent", unit: "pct", ymin: 0 })}
      ${sourceLine("BPS, consumer price index.")}`,
    sectors: `<h2>What the economy makes</h2>
      <p>Manufacturing is the largest single sector at 18.7% of GDP in 2024, ahead of trade at 13.0% and agriculture at 12.5%.</p>
      <div class="donut-wrap">${donut.svg}<ul class="legend">${donut.legend}</ul></div>
      ${hbarChart(SECTORS.map((s) => ({ name: s.name, value: s.share, suffix: "%" })), { label: "Share of GDP by sector, 2024" })}
      ${sourceLine("BPS, national accounts, 2024. Shares sum to 100%.")}`,
    trade: `<h2>Trade with the world</h2>
      <div class="stat-row">
        <div><p class="big">$${TRADE.exports.toFixed(1)}B</p><p>Exports, ${TRADE.year} (BPS)</p></div>
        <div><p class="big">$${TRADE.imports.toFixed(1)}B</p><p>Imports, ${TRADE.year} (BPS)</p></div>
        <div><p class="big">$${TRADE.surplus.toFixed(1)}B</p><p>Trade surplus, ${TRADE.year} (BPS)</p></div>
        <div><p class="big">$${TRADE.reserves.toFixed(1)}B</p><p>FX reserves, end-${TRADE.year} (Bank Indonesia)</p></div>
      </div>
      <h3>Top exports, US$ billion, ${TRADE.year}</h3>
      ${hbarChart(TRADE.topExports.map((t) => ({ name: t.good, value: t.value, suffix: "B" })), { label: "Top exports, 2024" })}
      ${sourceLine("BPS, foreign trade statistics 2024. Top-export values are the leading HS chapters, rounded.")}`,
  };
  return `
  <section class="page-head"><p class="eyebrow">Economy</p>
  <h1>The economy</h1>
  <p class="lede">A $1.40 trillion economy in 2024 — the largest in Southeast Asia — growing about 5% a year, with manufacturing first and a $31 billion trade surplus.</p></section>
  <div class="tabs" role="tablist" aria-label="Economy sections">
    <button role="tab" data-econtab="growth" class="${tab === "growth" ? "on" : ""}" aria-selected="${tab === "growth"}">Growth</button>
    <button role="tab" data-econtab="sectors" class="${tab === "sectors" ? "on" : ""}" aria-selected="${tab === "sectors"}">Sectors</button>
    <button role="tab" data-econtab="trade" class="${tab === "trade" ? "on" : ""}" aria-selected="${tab === "trade"}">Trade</button>
  </div>
  <section class="panel">${panels[tab]}</section>`;
}

export function renderPeople(state) {
  const rows = filteredProvinces(state);
  const tableRows = rows.map((p) =>
    `<tr><td>${p.name}</td><td>${p.island}</td><td class="num">${formatMillions(p.pop)}</td><td class="num">${formatPeople(p.pop)}</td></tr>`).join("");
  return `
  <section class="page-head"><p class="eyebrow">People</p>
  <h1>283.5 million people</h1>
  <p class="lede">One in four Indonesians is under 15. Life expectancy is 71.1 years, and four in five people are online.</p></section>
  <section class="kpis" aria-label="People indicators">
    ${PEOPLE.map((p) => `<article class="kpi"><p class="kpi-label">${p.label}</p><p class="kpi-value">${p.value}</p><p class="kpi-note">${p.year} · ${p.source}</p></article>`).join("")}
  </section>
  <section class="panel">
    <h2>Age structure, 2024</h2>
    <p>The working-age share (15–64) is 68.5% — the demographic dividend is still open, with 7.3% aged 65 and over.</p>
    ${hbarChart(AGE_STRUCTURE.map((a) => ({ name: a.group, value: a.share, suffix: "%" })), { label: "Age structure, 2024" })}
    ${sourceLine("BPS, population projections 2024.")}
  </section>
  <section class="panel">
    <div class="panel-head"><div><h2>Population by province, 2024</h2>
    <p>All 38 provinces. Search by name or island, or sort by clicking a column heading. Figures are BPS mid-year estimates, rounded to 0.1 million.</p></div>
    <button id="csv-btn" class="btn">Download CSV</button></div>
    <div class="table-tools">
      <label>Search <input id="prov-search" type="search" placeholder="e.g. Java or Bali" value="${state.provQuery || ""}" aria-label="Search provinces"></label>
      <p id="prov-count" role="status">${rows.length} of ${PROVINCES.length} provinces shown</p>
    </div>
    <div class="table-wrap"><table id="prov-table">
      <thead><tr>
        <th><button data-sort="name">Province ${sortMark(state, "name")}</button></th>
        <th><button data-sort="island">Island group ${sortMark(state, "island")}</button></th>
        <th class="num"><button data-sort="pop">Population ${sortMark(state, "pop")}</button></th>
        <th class="num">People</th>
      </tr></thead>
      <tbody>${tableRows || `<tr><td colspan="4">No province matches “${state.provQuery}”. Clear the search to see all 38.</td></tr>`}</tbody>
    </table></div>
    ${sourceLine("BPS, mid-year population estimates 2024.")}
  </section>`;
}

export function filteredProvinces(state) {
  const q = (state.provQuery || "").trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const key = state.provSort || "pop";
  const dir = state.provDir || -1;
  rows = [...rows].sort((a, b) => {
    const av = a[key], bv = b[key];
    if (typeof av === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
  return rows;
}

export function provinceCSV() {
  const head = "Province,Island group,Population (millions, 2024),People (2024)\n";
  const lines = PROVINCES.map((p) => `"${p.name}","${p.island}",${p.pop.toFixed(1)},${Math.round(p.pop * 1e6)}`).join("\n");
  return head + lines + "\nSource: BPS, mid-year population estimates 2024.\n";
}

function sortMark(state, key) {
  if ((state.provSort || "pop") !== key) return "";
  return (state.provDir || -1) === -1 ? "▼" : "▲";
}

export function renderRegions() {
  return `
  <section class="page-head"><p class="eyebrow">Regions</p>
  <h1>Where people live</h1>
  <p class="lede">More than half the country lives on Java — an island smaller than England — while Kalimantan and Papua, vast and forested, hold a small share each.</p></section>
  <section class="panel">
    <h2>Share of population by island group, 2020 census</h2>
    ${hbarChart(ISLANDS.map((i) => ({ name: i.name, value: i.share, suffix: "%" })), { label: "Share of population by island group" })}
    ${sourceLine("BPS, Population Census 2020. Shares sum to 100%.")}
    <ul class="island-notes">${ISLANDS.map((i) => `<li><strong>${i.name} — ${i.share}%:</strong> ${i.note}.</li>`).join("")}</ul>
  </section>
  <section class="panel">
    <h2>The six largest provinces</h2>
    <p>West Java alone, at 49.9 million people in 2024, is larger than most countries — bigger than Spain or South Korea.</p>
    ${hbarChart([...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 6).map((p) => ({ name: p.name, value: p.pop, suffix: "M" })), { label: "Largest provinces, 2024" })}
    ${sourceLine("BPS, mid-year population estimates 2024.")}
    <p><a class="btn" href="#/people">See all 38 provinces →</a></p>
  </section>
  <section class="panel">
    <h2>A country of distances</h2>
    <p>From Banda Aceh in the west to Jayapura in the east is about 5,100 km — roughly the distance from London to New York's latitude span, and three time zones: Western (WIB, UTC+7), Central (WITA, UTC+8) and Eastern (WIT, UTC+9).</p>
    <p>Land area ${COUNTRY.areaKm2.toLocaleString("en-US")} km² across ${COUNTRY.islands.toLocaleString("en-US")} named islands; the capital is moving from Jakarta to ${COUNTRY.capital} on Borneo.</p>
    ${sourceLine("BPS, Statistical Yearbook of Indonesia 2025.")}
  </section>`;
}

export function renderMethods() {
  return `
  <section class="page-head"><p class="eyebrow">Sources &amp; methods</p>
  <h1>Where every number comes from</h1>
  <p class="lede">NusaStats is an independent explorer, not affiliated with any statistics office. Every figure names its publisher and year, so you can check it.</p></section>
  <section class="panel">
    <h2>Sources</h2>
    <ul class="source-list">${SOURCES.map((s) => `<li><strong>${s.short}:</strong> ${s.full}</li>`).join("")}</ul>
  </section>
  <section class="panel">
    <h2>Methods &amp; notes</h2>
    <ul class="notes">
      <li>Population and GDP in US dollars come from the World Bank's World Development Indicators; growth, inflation, unemployment, poverty and provincial populations come from BPS releases.</li>
      <li>Figures are rounded for display: populations to 0.1 million, money to the nearest billion, shares to 0.1 points. Rounded parts may not sum exactly.</li>
      <li>“2024” figures are the latest full-year values published by November 2026; unemployment is February 2025 and poverty is September 2024, the latest releases at the time.</li>
      <li>Island-group shares are from the 2020 census, the latest census; provincial populations are BPS mid-year estimates for 2024.</li>
      <li>The capital is listed as Nusantara (Ibu Kota Nusantara): the seat of government is moving there from Jakarta under the 2022 capital law.</li>
      <li>This site works entirely offline: no figure is fetched from the network, and no visit is tracked.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>About NusaStats</h2>
    <p>Built as an original entry for the make.fun “best national statistics site” bounty: its design, text and charts are its own, and its numbers are cited public statistics about Indonesia. If a figure looks wrong, check the source named beside it — and tell us which release disagrees.</p>
    <p>Last updated: ${COUNTRY.updated}.</p>
  </section>`;
}
