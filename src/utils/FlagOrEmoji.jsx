import React from "react";
import { Helmet } from "react-helmet";
import CountryFlag from "react-country-flag";

/**
 * Affiche un drapeau SVG (code ISO), plusieurs drapeaux (NP/CN) ou un émoji (🌊) selon la valeur passée.
 * Utilise avec countryToCode[evenement.country] !
 */
export default function FlagOrEmoji({ code, size = "2em" }) {
  if (!code) return null;

  // SEO statique pour ce composant utilitaire
  const pageTitle = "WorldScope — Drapeau ou Emoji";
  const pageDescription =
    "Composant FlagOrEmoji : affiche un drapeau SVG ou un emoji selon le code fourni.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/*
        1. Cas code pays unique (2 lettres)
      */}
      {(/^[A-Z]{2}$/.test(code)) && (
        <CountryFlag
          countryCode={code}
          svg
          style={{
            width: size,
            height: size,
            borderRadius: "4px",
            marginRight: 4,
            boxShadow: "0 0 4px #1117",
          }}
        />
      )}

      {/*
        2. Cas multipays "NP/CN" ou "KP/KR"
      */}
      {(/^([A-Z]{2}\/)+[A-Z]{2}$/.test(code)) && (
        <span style={{ display: "inline-flex", gap: 4 }}>
          {code.split("/").map((cc, idx) => (
            <CountryFlag
              key={cc + idx}
              countryCode={cc}
              svg
              style={{
                width: size,
                height: size,
                borderRadius: "4px",
                marginRight: 2,
                boxShadow: "0 0 4px #1117",
              }}
            />
          ))}
        </span>
      )}

      {/*
        3. Cas émoji (🌊 🧭 etc) ou suite d'émojis (🇰🇵🇰🇷)
      */}
      {(/\p{Extended_Pictographic}/u.test(code)) && (
        <span style={{ fontSize: size }}>{code}</span>
      )}
    </>
  );
}