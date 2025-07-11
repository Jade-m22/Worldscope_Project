import CountryFlag from "react-country-flag";

/**
 * Affiche un drapeau SVG (code ISO), plusieurs drapeaux (NP/CN) ou un émoji (🌊) selon la valeur passée.
 * Utilise avec countryToCode[evenement.country] !
 */
export default function FlagOrEmoji({ code, size = "2em" }) {
  if (!code) return null;

  // 1. Cas code pays unique (2 lettres)
  if (/^[A-Z]{2}$/.test(code)) {
    return (
      <CountryFlag
        countryCode={code}
        svg
        style={{
          width: size,
          height: size,
          borderRadius: "4px",
          marginRight: 4,
          boxShadow: "0 0 4px #1117"
        }}
      />
    );
  }

  // 2. Cas multipays "NP/CN" ou "KP/KR"
  if (/^([A-Z]{2}\/)+[A-Z]{2}$/.test(code)) {
    return (
      <span style={{ display: "inline-flex", gap: 4 }}>
        {code.split('/').map((cc, idx) =>
          <CountryFlag
            key={cc + idx}
            countryCode={cc}
            svg
            style={{
              width: size,
              height: size,
              borderRadius: "4px",
              marginRight: 2,
              boxShadow: "0 0 4px #1117"
            }}
          />
        )}
      </span>
    );
  }

  // 3. Cas émoji (🌊 🧭 etc) ou suite d'émojis (🇰🇵🇰🇷)
  if (/\p{Extended_Pictographic}/u.test(code)) {
    return <span style={{ fontSize: size }}>{code}</span>;
  }

  // Par défaut, rien
  return null;
}