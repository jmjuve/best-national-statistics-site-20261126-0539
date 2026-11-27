// NusaStats data: Indonesia in numbers.
// Every figure carries its source and year. Values are rounded for display;
// the Sources page names the exact publication behind each series.
// Figures were compiled from the publications listed in SOURCES below.

export const COUNTRY = {
  name: "Indonesia",
  tagline: "Indonesia in Numbers",
  capital: "Nusantara (Ibu Kota Nusantara)",
  formerSeat: "Jakarta",
  areaKm2: 1904569,
  islands: 17508,
  provinces: 38,
  currency: "Rupiah (IDR)",
  updated: "November 2026",
};

export const SOURCES = [
  { short: "BPS", full: "Badan Pusat Statistik (Statistics Indonesia) — official releases and Statistical Yearbook of Indonesia 2025" },
  { short: "World Bank", full: "World Bank, World Development Indicators (WDI), accessed November 2026" },
  { short: "UNDP", full: "United Nations Development Programme, Human Development Report 2023–24" },
  { short: "Bank Indonesia", full: "Bank Indonesia, external sector statistics, December 2024" },
  { short: "APJII", full: "Asosiasi Penyelenggara Jasa Internet Indonesia (APJII), Internet Survey 2024" },
  { short: "Census 2020", full: "BPS, Population Census 2020 (Sensus Penduduk 2020)" },
];

// Population, millions, mid-year (World Bank WDI)
export const POPULATION_SERIES = [
  { year: 2015, value: 258.2 }, { year: 2016, value: 261.1 },
  { year: 2017, value: 264.0 }, { year: 2018, value: 266.9 },
  { year: 2019, value: 269.6 }, { year: 2020, value: 271.9 },
  { year: 2021, value: 274.9 }, { year: 2022, value: 277.5 },
  { year: 2023, value: 280.3 }, { year: 2024, value: 283.5 },
];

// Real GDP growth, % per year (BPS)
export const GDP_GROWTH_SERIES = [
  { year: 2019, value: 5.0 }, { year: 2020, value: -2.1 },
  { year: 2021, value: 3.7 }, { year: 2022, value: 5.3 },
  { year: 2023, value: 5.1 }, { year: 2024, value: 5.0 },
];

// GDP, current US$ billion (World Bank WDI)
export const GDP_LEVEL_SERIES = [
  { year: 2019, value: 1119 }, { year: 2020, value: 1059 },
  { year: 2021, value: 1186 }, { year: 2022, value: 1319 },
  { year: 2023, value: 1371 }, { year: 2024, value: 1396 },
];

// Consumer-price inflation, % per year (BPS)
export const INFLATION_SERIES = [
  { year: 2019, value: 2.7 }, { year: 2020, value: 1.7 },
  { year: 2021, value: 1.9 }, { year: 2022, value: 5.5 },
  { year: 2023, value: 2.6 }, { year: 2024, value: 1.6 },
];

// Headline indicators shown on the overview page.
export const HEADLINES = [
  { id: "population", label: "Population", value: "283.5M", note: "mid-year 2024", source: "World Bank WDI" },
  { id: "gdp", label: "GDP", value: "$1.40T", note: "current US$, 2024", source: "World Bank WDI" },
  { id: "gdp-per-capita", label: "GDP per capita", value: "$4,925", note: "current US$, 2024", source: "World Bank WDI" },
  { id: "growth", label: "Real GDP growth", value: "5.0%", note: "year on year, 2024", source: "BPS" },
  { id: "unemployment", label: "Unemployment rate", value: "4.76%", note: "February 2025", source: "BPS" },
  { id: "poverty", label: "Poverty rate", value: "8.57%", note: "September 2024", source: "BPS" },
  { id: "inflation", label: "Inflation (CPI)", value: "1.6%", note: "annual, 2024", source: "BPS" },
  { id: "hdi", label: "Human Development Index", value: "0.728", note: "high human development, 2023", source: "UNDP" },
];

// GDP by sector, % of GDP, 2024 (BPS)
export const SECTORS = [
  { name: "Manufacturing", share: 18.7 },
  { name: "Wholesale & retail trade", share: 13.0 },
  { name: "Agriculture, forestry & fishing", share: 12.5 },
  { name: "Construction", share: 9.9 },
  { name: "Mining & quarrying", share: 9.5 },
  { name: "All other sectors", share: 36.4 },
];

// External trade, US$ billion (BPS, 2024)
export const TRADE = {
  year: 2024,
  exports: 264.7,
  imports: 233.7,
  surplus: 31.0,
  reserves: 155.7, // foreign-exchange reserves, end of 2024 (Bank Indonesia)
  topExports: [
    { good: "Coal briquettes", value: 31.4 },
    { good: "Palm oil", value: 26.5 },
    { good: "Iron & steel", value: 21.9 },
    { good: "Natural gas", value: 9.8 },
    { good: "Copper ore", value: 8.6 },
  ],
};

// Age structure, % of population, 2024 (BPS)
export const AGE_STRUCTURE = [
  { group: "0–14 years", share: 24.2 },
  { group: "15–64 years", share: 68.5 },
  { group: "65+ years", share: 7.3 },
];

// People indicators (sources named per figure)
export const PEOPLE = [
  { label: "Life expectancy at birth", value: "71.1 years", year: "2023", source: "World Bank WDI" },
  { label: "Human Development Index", value: "0.728", year: "2023", source: "UNDP" },
  { label: "Internet users", value: "221.6 million", year: "2024", source: "APJII" },
  { label: "Internet penetration", value: "79.5%", year: "2024", source: "APJII" },
  { label: "Median age", value: "30.6 years", year: "2024", source: "BPS" },
  { label: "Fertility rate", value: "2.1 children", year: "2023", source: "World Bank WDI" },
];

// Population by island group, % of population (Census 2020, BPS)
export const ISLANDS = [
  { name: "Java", share: 56.1, note: "home to Jakarta, Bandung, Surabaya" },
  { name: "Sumatra", share: 21.7, note: "Medan, Palembang, Pekanbaru" },
  { name: "Sulawesi", share: 7.4, note: "Makassar, Manado, Palu" },
  { name: "Kalimantan", share: 6.2, note: "Balikpapan, Pontianak, Banjarmasin" },
  { name: "Bali & Nusa Tenggara", share: 5.4, note: "Denpasar, Mataram, Kupang" },
  { name: "Maluku & Papua", share: 3.3, note: "Ambon, Jayapura, Sorong" },
];

// Provinces: population in millions, mid-year 2024 (BPS, rounded to 0.1M)
export const PROVINCES = [
  { name: "West Java", pop: 49.9, island: "Java" },
  { name: "East Java", pop: 41.9, island: "Java" },
  { name: "Central Java", pop: 38.0, island: "Java" },
  { name: "North Sumatra", pop: 15.6, island: "Sumatra" },
  { name: "Banten", pop: 12.4, island: "Java" },
  { name: "Jakarta", pop: 10.6, island: "Java" },
  { name: "South Sulawesi", pop: 9.4, island: "Sulawesi" },
  { name: "Lampung", pop: 9.3, island: "Sumatra" },
  { name: "South Sumatra", pop: 8.8, island: "Sumatra" },
  { name: "Riau", pop: 7.0, island: "Sumatra" },
  { name: "West Sumatra", pop: 5.9, island: "Sumatra" },
  { name: "West Kalimantan", pop: 5.8, island: "Kalimantan" },
  { name: "East Nusa Tenggara", pop: 5.7, island: "Bali & Nusa Tenggara" },
  { name: "West Nusa Tenggara", pop: 5.7, island: "Bali & Nusa Tenggara" },
  { name: "Aceh", pop: 5.6, island: "Sumatra" },
  { name: "Bali", pop: 4.4, island: "Bali & Nusa Tenggara" },
  { name: "South Kalimantan", pop: 4.3, island: "Kalimantan" },
  { name: "East Kalimantan", pop: 4.0, island: "Kalimantan" },
  { name: "Yogyakarta", pop: 3.8, island: "Java" },
  { name: "Jambi", pop: 3.6, island: "Sumatra" },
  { name: "Central Sulawesi", pop: 3.1, island: "Sulawesi" },
  { name: "Southeast Sulawesi", pop: 2.8, island: "Sulawesi" },
  { name: "Central Kalimantan", pop: 2.8, island: "Kalimantan" },
  { name: "North Sulawesi", pop: 2.7, island: "Sulawesi" },
  { name: "Riau Islands", pop: 2.2, island: "Sumatra" },
  { name: "Bengkulu", pop: 2.1, island: "Sumatra" },
  { name: "Maluku", pop: 2.0, island: "Maluku & Papua" },
  { name: "West Sulawesi", pop: 1.5, island: "Sulawesi" },
  { name: "Bangka Belitung", pop: 1.5, island: "Sumatra" },
  { name: "North Maluku", pop: 1.4, island: "Maluku & Papua" },
  { name: "Central Papua", pop: 1.3, island: "Maluku & Papua" },
  { name: "Highland Papua", pop: 1.4, island: "Maluku & Papua" },
  { name: "Gorontalo", pop: 1.2, island: "Sulawesi" },
  { name: "Papua", pop: 1.1, island: "Maluku & Papua" },
  { name: "North Kalimantan", pop: 0.7, island: "Kalimantan" },
  { name: "Southwest Papua", pop: 0.6, island: "Maluku & Papua" },
  { name: "West Papua", pop: 0.6, island: "Maluku & Papua" },
  { name: "South Papua", pop: 0.5, island: "Maluku & Papua" },
];

export function formatMillions(v) {
  return v.toFixed(1) + "M";
}

export function formatPeople(v) {
  return (v * 1e6).toLocaleString("en-US");
}
