// NusaStats charts: small SVG chart builders with no dependencies.
// Each function takes data and returns an SVG string. All text is drawn
// as SVG text, so the charts stay readable in a screenshot at any size.

const NS = "http://www.w3.org/2000/svg";

export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function gridLines(min, max, height, top, bottom, width, left, right, unit) {
  const ticks = 4;
  let out = "";
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const y = top + height - ((v - min) / (max - min)) * height;
    out += `<line x1="${left}" y1="${y.toFixed(1)}" x2="${width - right}" y2="${y.toFixed(1)}" class="grid"/>`;
    out += `<text x="${left - 8}" y="${(y + 4).toFixed(1)}" class="axis" text-anchor="end">${esc(fmtTick(v, unit))}</text>`;
  }
  return out;
}

function fmtTick(v, unit) {
  if (unit === "pct") return (Math.round(v * 10) / 10) + "%";
  if (unit === "usd-b") return "$" + Math.round(v) + "B";
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k";
  return String(Math.round(v * 10) / 10);
}

// Line chart over a year series. opts: {width, height, unit, color, label, ymin}
export function lineChart(series, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const left = 52, right = 16, top = 14, bottom = 30;
  const iw = w - left - right, ih = h - top - bottom;
  const vals = series.map((d) => d.value);
  let min = Math.min(...vals, 0), max = Math.max(...vals);
  if (opts.ymin !== undefined) min = opts.ymin;
  if (max - min < 1e-9) max = min + 1;
  const span = max - min;
  const x = (i) => left + (iw * i) / (series.length - 1);
  const y = (v) => top + ih - ((v - min) / span) * ih;
  const color = opts.color || "#0e7c7b";
  let pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  let area = `M${left},${y(min).toFixed(1)} ` + series.map((d, i) => `L${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ") + ` L${x(series.length - 1).toFixed(1)},${y(min).toFixed(1)} Z`;
  let dots = series.map((d, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" class="dot" fill="${color}"><title>${d.year}: ${d.value}</title></circle>`).join("");
  let labels = series.map((d, i) =>
    `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 10).toFixed(1)}" class="val" text-anchor="middle">${esc(d.value)}</text>`).join("");
  let years = series.map((d, i) =>
    `<text x="${x(i).toFixed(1)}" y="${h - 8}" class="axis" text-anchor="middle">${d.year}</text>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "Line chart")}" xmlns="${NS}">
    ${gridLines(min, niceMax(max), ih, top, bottom, w, left, right, opts.unit)}
    <path d="${area}" fill="${color}" opacity="0.12"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${labels}${years}</svg>`;
}

// Vertical bar chart over a year series. Negative values draw below zero.
export function barChart(series, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const left = 52, right = 16, top = 22, bottom = 30;
  const iw = w - left - right, ih = h - top - bottom;
  const vals = series.map((d) => d.value);
  const min = Math.min(...vals, 0), max = Math.max(...vals, 0);
  const span = (max - min) || 1;
  const y = (v) => top + ih - ((v - min) / span) * ih;
  const zeroY = y(0);
  const slot = iw / series.length;
  const bw = Math.min(46, slot * 0.62);
  const color = opts.color || "#0e7c7b";
  const negColor = opts.negColor || "#c2492f";
  let bars = series.map((d, i) => {
    const cx = left + slot * i + slot / 2;
    const by = d.value >= 0 ? y(d.value) : zeroY;
    const bh = Math.max(1, Math.abs(y(d.value) - zeroY));
    const fill = d.value >= 0 ? color : negColor;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"><title>${d.year}: ${d.value}${opts.unit === "pct" ? "%" : ""}</title></rect>
    <text x="${cx.toFixed(1)}" y="${(d.value >= 0 ? by - 6 : by + bh + 14).toFixed(1)}" class="val" text-anchor="middle">${esc(d.value)}${opts.unit === "pct" ? "%" : ""}</text>
    <text x="${cx.toFixed(1)}" y="${h - 8}" class="axis" text-anchor="middle">${d.year}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "Bar chart")}" xmlns="${NS}">
    ${gridLines(min, niceMax(max), ih, top, bottom, w, left, right, opts.unit)}
    <line x1="${left}" y1="${zeroY.toFixed(1)}" x2="${w - right}" y2="${zeroY.toFixed(1)}" class="zero"/>
    ${bars}</svg>`;
}

// Horizontal bars for ranked categories: [{name, value, suffix}]
export function hbarChart(rows, opts = {}) {
  const w = opts.width || 640;
  const rowH = opts.rowHeight || 34;
  const labelW = opts.labelWidth || 190;
  const h = rowH * rows.length + 16;
  const max = Math.max(...rows.map((r) => r.value));
  const color = opts.color || "#0e7c7b";
  const bars = rows.map((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - 64) * r.value) / max;
    return `<text x="0" y="${y + 15}" class="hbar-label">${esc(r.name)}</text>
    <rect x="${labelW}" y="${y + 2}" width="${Math.max(2, bw).toFixed(1)}" height="18" rx="3" fill="${color}"><title>${esc(r.name)}: ${r.value}${r.suffix || ""}</title></rect>
    <text x="${(labelW + Math.max(2, bw) + 8).toFixed(1)}" y="${y + 16}" class="val">${Number(r.value).toFixed(1)}${r.suffix || ""}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "Ranked bars")}" xmlns="${NS}">${bars}</svg>`;
}

// Donut chart for shares: [{name, share}]. Returns svg + legend html.
export function donutChart(rows, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r - 30;
  const colors = ["#0e7c7b", "#d9a441", "#3f6fb5", "#c2492f", "#6a8f5f", "#8a7ca8"];
  const total = rows.reduce((s, x) => s + x.share, 0);
  let a0 = -Math.PI / 2;
  let paths = "";
  rows.forEach((row, i) => {
    const a1 = a0 + (row.share / total) * Math.PI * 2;
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    paths += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${esc(row.name)}: ${row.share}%</title></path>`;
    a0 = a1;
  });
  const legend = rows.map((row, i) =>
    `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(row.name)}<b>${row.share.toFixed(1)}%</b></li>`).join("");
  return { svg: `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || "Share donut")}" xmlns="${NS}">${paths}<text x="${cx}" y="${cy - 4}" class="donut-centre" text-anchor="middle">100%</text><text x="${cx}" y="${cy + 16}" class="donut-sub" text-anchor="middle">of GDP</text></svg>`, legend };
}
