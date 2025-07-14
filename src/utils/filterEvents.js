import events from "../data/events";

export default function filterEvents(filter, year, search, subcategories = []) {
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

  if (year !== undefined && year !== null) {
    filtered = filtered.filter((e) => {
      if (typeof e.year === "string" && e.year.includes("av. J.-C.")) {
        const y = Number(e.year.replace(/[^\d]/g, "")) * -1;
        return y <= year;
      } else if (typeof e.year === "string" && e.year.match(/\d+/)) {
        const y = parseInt(e.year);
        return y <= year;
      }
      return true;
    });
  }

  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(e => (
      (e.title && e.title.toLowerCase().includes(s)) ||
      (e.country && e.country.toLowerCase().includes(s)) ||
      (e.status && e.status.toLowerCase().includes(s)) ||
      (e.type && e.type.toLowerCase().includes(s)) ||
      (e.year && String(e.year).toLowerCase().includes(s)) ||
      (e.desc && e.desc.toLowerCase().includes(s))
    ));
  }

  return filtered;
}

