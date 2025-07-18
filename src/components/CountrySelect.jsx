import React from "react";
import Select from "react-select";
import CountryFlag from "react-country-flag";
import countryToCode from "../utils/countryCodes";

// Génère les options avec flag (emoji ou code pays)
const getCountryOptions = () =>
  Object.entries(countryToCode)
    .map(([country, code]) => {
      // Si c’est un emoji (unicode), on l’utilise
      if (/\p{Extended_Pictographic}/u.test(code)) {
        return {
          value: country,
          label: (
            <span>
              {code}&nbsp;{country}
            </span>
          ),
        };
      }
      // Si c’est un code ISO (2 lettres)
      if (/^[A-Z]{2}$/.test(code)) {
        return {
          value: country,
          label: (
            <span>
              <CountryFlag
                countryCode={code}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  borderRadius: "4px",
                  marginRight: "7px",
                  verticalAlign: "middle",
                }}
              />
              {country}
            </span>
          ),
        };
      }
      // Multipays (genre KP/KR)
      if (/^([A-Z]{2}\/)+[A-Z]{2}$/.test(code)) {
        return {
          value: country,
          label: (
            <span>
              {code.split('/').map((cc, idx) => (
                <CountryFlag
                  key={cc + idx}
                  countryCode={cc}
                  svg
                  style={{
                    width: "1.15em",
                    height: "1.15em",
                    borderRadius: "3px",
                    marginRight: "1px",
                  }}
                />
              ))}
              &nbsp;{country}
            </span>
          ),
        };
      }
      // Fallback: juste texte
      return {
        value: country,
        label: country,
      };
    })
    // Trie alphabétique sur le nom du pays
    .sort((a, b) => a.value.localeCompare(b.value));

export default function CountrySelect({ value, onChange }) {
  const options = [
    { value: "", label: "🌍 Tous les pays" },
    ...getCountryOptions(),
  ];

  return (
    <Select
      classNamePrefix="country-select"
      options={options}
      value={options.find((o) => o.value === value)}
      onChange={(selected) => onChange(selected ? selected.value : "")}
      isClearable
      placeholder="🌍 Tous les pays"
      styles={{
        control: (base) => ({
          ...base,
          background: "#1f2e3a",
          color: "#eaf6ff",
          borderRadius: 8,
          border: "1.2px solid #2ef9c880",
        }),
        menu: (base) => ({
          ...base,
          background: "#14212c",
          color: "#eaf6ff",
          borderRadius: 8,
        }),
        singleValue: (base) => ({
          ...base,
          color: "#eaf6ff",
        }),
        option: (base, state) => ({
          ...base,
          background: state.isFocused ? "#3edc9330" : "transparent",
          color: "#eaf6ff",
          cursor: "pointer",
        }),
      }}
    />
  );
}
