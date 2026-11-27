// NusaStats main: hash router and control wiring.
// Routes: #/ (overview), #/economy, #/people, #/regions, #/methods.
// State lives here and is passed to the views on every render, so every
// control — chart toggle, tabs, search, sort, CSV download — re-renders
// from the same state and always does what it says.
import { renderOverview, renderEconomy, renderPeople, renderRegions, renderMethods, filteredProvinces, provinceCSV } from "./views.js";
import { PROVINCES } from "./data.js";

const state = {
  popView: "line",
  econTab: "growth",
  provQuery: "",
  provSort: "pop",
  provDir: -1,
};

const ROUTES = {
  "/": { render: renderOverview, title: "Indonesia in Numbers" },
  "/economy": { render: renderEconomy, title: "The Economy" },
  "/people": { render: renderPeople, title: "People" },
  "/regions": { render: renderRegions, title: "Regions" },
  "/methods": { render: renderMethods, title: "Sources & Methods" },
};

const pageEl = document.getElementById("page");
const navEl = document.getElementById("nav");

function currentRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = currentRoute();
  pageEl.innerHTML = ROUTES[route].render(state);
  document.title = `${ROUTES[route].title} — NusaStats`;
  navEl.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("current", a.getAttribute("href") === `#${route}`);
    if (a.getAttribute("href") === `#${route}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  wireControls();
  window.scrollTo(0, 0);
}

function wireControls() {
  // Population chart line/bars toggle (overview)
  pageEl.querySelectorAll("[data-popview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.popView = btn.dataset.popview;
      render();
    });
  });
  // Economy tabs
  pageEl.querySelectorAll("[data-econtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.econTab = btn.dataset.econtab;
      render();
    });
  });
  // Province search (people): live filter, keeps focus and caret.
  const search = document.getElementById("prov-search");
  if (search) {
    search.addEventListener("input", () => {
      state.provQuery = search.value;
      const rows = filteredProvinces(state);
      const tbody = document.querySelector("#prov-table tbody");
      const count = document.getElementById("prov-count");
      tbody.innerHTML = rows.map((p) =>
        `<tr><td>${p.name}</td><td>${p.island}</td><td class="num">${p.pop.toFixed(1)}M</td><td class="num">${(p.pop * 1e6).toLocaleString("en-US")}</td></tr>`).join("")
        || `<tr><td colspan="4">No province matches “${state.provQuery}”. Clear the search to see all 38.</td></tr>`;
      count.textContent = `${rows.length} of ${PROVINCES.length} provinces shown`;
    });
  }
  // Province sort (people): click a heading to sort, again to reverse.
  pageEl.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sort;
      if (state.provSort === key) state.provDir = -state.provDir;
      else { state.provSort = key; state.provDir = key === "pop" ? -1 : 1; }
      render();
    });
  });
  // Province CSV download (people): builds the file in the browser.
  const csvBtn = document.getElementById("csv-btn");
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const blob = new Blob([provinceCSV()], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nusastats-provinces-2024.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}

window.addEventListener("hashchange", render);
render();
