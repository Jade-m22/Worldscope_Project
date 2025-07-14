export async function fetchWikiExtract(title) {
  const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Wiki API error pour "${title}" :`, res.status);
    return null;
  }
  const data = await res.json();
  return {
    extract: data.extract,
    image: data.originalimage?.source || data.thumbnail?.source || ""
  };
}
