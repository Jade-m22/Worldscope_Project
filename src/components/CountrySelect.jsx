import React from "react";
import { Helmet } from "react-helmet";
import Select from "react-select";
import CountryFlag from "react-country-flag";
import countryToCode from "../utils/countryCodes";

// Génère les options enrichies (emoji| drapeau SVG| texte)
const getCountryOptions = () =>
  Object.entries(countryToCode)
    .map(([country, code]) => {
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
      if (/^([A-Z]{2}\/)+[A-Z]{2}$/.test(code)) {
        return {
          value: country,
          label: (
            <span>
              {code.split("/").map((cc, idx) => (
                <CountryFlag
                  key={cc + idx}
                  countryCode={cc}
                  svg
                  style={{
                    width: "1.15em",
                    height: "1.15em",
                    borderRadius: "3px",
                    marginRight: "1px",
                    verticalAlign: "middle",
                  }}
                />
              ))}
              &nbsp;{country}
            </span>
          ),
        };
      }
      return {
        value: country,
        label: country,
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

export default function CountrySelect({ value, onChange }) {
  const options = [
    { value: "", label: "🌍 Tous les pays" },
    ...getCountryOptions(),
  ];

  // SEO dynamique
  const selectedLabel =
    options.find((o) => o.value === value)?.label || "🌍 Tous les pays";
  const pageTitle = `WorldScope — ${selectedLabel}`;
  const pageDescription = value
    ? `Événements filtrés pour ${selectedLabel} sur WorldScope.`
    : "Affichage de tous les pays sur WorldScope.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <Select
        classNamePrefix="country-select"
        options={options}
        value={options.find((o) => o.value === value) || null}
        onChange={(selected) => {
          onChange(selected ? selected.value : "");
        }}
        isClearable
        placeholder="🌍 Tous les pays"
        styles={{
          control: (base) => ({
            ...base,
            background: "#1f2e3a",
            borderRadius: 8,
            border: "1.2px solid #2ef9c880",
            color: "#eaf6ff",
          }),
          menu: (base) => ({
            ...base,
            background: "#14212c",
            borderRadius: 8,
          }),
          singleValue: (base) => ({
            ...base,
            color: "#eaf6ff",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#777",
          }),
          option: (base, state) => ({
            ...base,
            background: state.isFocused ? "#3edc9330" : "transparent",
            color: "#eaf6ff",
            cursor: "pointer",
          }),
          clearIndicator: (base) => ({
            ...base,
            color: "#eaf6ff",
            cursor: "pointer",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#eaf6ff",
            cursor: "pointer",
          }),
        }}
      />
    </>
  );
}