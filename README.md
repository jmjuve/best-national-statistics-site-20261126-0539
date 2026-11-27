# 📊 NusaStats — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/jmjuve/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/jmjuve/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original national statistics site for the [make.fun best-national-statistics-site-20261126-0539 bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

**Indonesia in numbers, with the receipt attached.** Population, economy, people and regions — every figure names its source and year, every chart is drawn from those figures, and every control on the page works. No sign-in, no tracking, no network: the whole site ships as static files and runs offline in a desktop browser or on a phone.

## What is inside

- **Overview** — eight headline indicators (population 283.5M, GDP $1.40T, GDP per capita $4,925, growth 5.0%, unemployment 4.76%, poverty 8.57%, inflation 1.6%, HDI 0.728 — each with source and year), a population trend chart with a line/bars switch, and a GDP growth chart.
- **Economy** — Growth, Sectors and Trade tabs: GDP in dollars 2019–2024, real growth, inflation, sector shares (manufacturing 18.7% first), and trade — $264.7B exports, $233.7B imports, a $31.0B surplus in 2024.
- **People** — life expectancy, HDI, internet users, age structure, and a searchable, sortable table of all 38 provinces with a working CSV download.
- **Regions** — where people live: island-group shares from the 2020 census, the six largest provinces, and the country's three time zones.
- **Sources & methods** — every publisher behind the numbers (BPS, World Bank WDI, UNDP, Bank Indonesia, APJII) and the rounding notes.

## Run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 in a desktop browser. No build step, no network requests, no libraries — plain static files under `app/`, charts drawn as inline SVG. `?shot=` is not needed; the pages are hash routes (`#/economy`, `#/people`, …).

## Files

- `app/index.html` — the page shell, header nav, footer
- `app/style.css` — the whole look: teal/amber ledger design, phone layout
- `app/data.js` — every figure, with its source and year
- `app/charts.js` — line, bar, ranked-bar and donut SVG builders
- `app/views.js` — one renderer per page
- `app/main.js` — hash router and control wiring
- `main.ts` — the make.fun entry program (Node 22), hands in `app/` + `screenshots/` + `dossier.json`
- `vendor/makefun-frontend.ts` — the kit's library, unchanged

An original site — its design, text and charts are its own; its numbers are cited public statistics about Indonesia, and it is not affiliated with BPS or any government body.
