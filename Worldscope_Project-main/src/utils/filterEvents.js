import events from "../data/events";

export default function filterEvents(
  filter,
  range,
  search,
  subcategories = [],
  country = ""
) {
  let filtered = events;

  if (filter && filter !== "") {
    if (["À visiter", "À éviter", "Dangereux"].includes(filter)) {
      filtered = filtered.filter(e => e.status === filter);

      if (filter === "À visiter" && subcategories.length > 0) {
        filtered = filtered.filter(e => subcategories.includes(e.subcategory));
      }
    } else {
      filtered = filtered.filter(e => e.type === filter);
    }
  }

  if (country && country !== "") {
    filtered = filtered.filter(e => e.country === country);
  }

  // ✅ Filtrage par plage d'années
  if (Array.isArray(range) && range.length === 2) {
    const [start, end] = range;

    filtered = filtered.filter(e => {
      const y = parseEventYear(e.year);
      return y !== null && y >= start && y <= end;
    });
  }

  // 🔎 Recherche texte
  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(e =>
      (e.title && e.title.toLowerCase().includes(s)) ||
      (e.country && e.country.toLowerCase().includes(s)) ||
      (e.status && e.status.toLowerCase().includes(s)) ||
      (e.type && e.type.toLowerCase().includes(s)) ||
      (e.year && String(e.year).toLowerCase().includes(s)) ||
      (e.desc && e.desc.toLowerCase().includes(s))
    );
  }

  return filtered;
}

// ✅ Convertit une année string en nombre (ex: "300 av. J.-C." → -300)
function parseEventYear(year) {
  if (!year || typeof year !== "string") return null;

  if (year.includes("av. J.-C.")) {
    const val = parseInt(year.replace(/[^\d]/g, ""));
    return isNaN(val) ? null : -val;
  }

  const match = year.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}
