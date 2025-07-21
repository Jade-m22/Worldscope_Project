export default function countryFlag(code = "") {
  if (!code || typeof code !== "string") return "";
  const upper = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "";
  // Emoji flag Unicode
  try {
    return upper
      .split("")
      .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
      .join("");
  } catch {
    return "";
  }
}