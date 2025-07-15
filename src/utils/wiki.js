const wikiCache = new Map();

function sanitizeWikiTitle(title) {
  return title
    .replace(/–/g, '-') // remplace les tirets longs
    .replace(/\(.*?\)/g, '') // enlève les parenthèses
    .replace(/–/g, '') // supprime les tirets restants
    .replace(/ +/g, ' ') // espaces en trop
    .trim();
}

export async function fetchWikiExtract(title) {
  if (wikiCache.has(title)) return wikiCache.get(title);

  const sanitizedTitle = sanitizeWikiTitle(title);

  let url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sanitizedTitle)}`;
  let res = await fetch(url);

  if (!res.ok) {
    console.warn(`Échec avec le titre direct : ${sanitizedTitle}, tentative de recherche...`);
    const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData?.query?.search?.length) {
      const bestMatchTitle = searchData.query.search[0].title;
      console.info(`Article trouvé via recherche : ${bestMatchTitle}`);
      url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestMatchTitle)}`;
      res = await fetch(url);
    } else {
      console.warn(`Aucun résultat de recherche pour : ${title}`);
      wikiCache.set(title, null); // éviter de re-refetch plus tard
      return null;
    }
  }

  if (!res.ok) {
    console.warn(`Échec définitif pour : ${title}`);
    wikiCache.set(title, null);
    return null;
  }

  const data = await res.json();
  const result = {
    extract: data.extract,
    image: data.originalimage?.source || data.thumbnail?.source || ""
  };

  wikiCache.set(title, result);
  return result;
}
