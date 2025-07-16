import { useState, useRef } from "react";
import useEventState from "./useEventState";
import filterEvents from "../utils/filterEvents";

export default function useFiltersLogic() {
  const {
    filter,
    setFilter,
    selected,
    setSelected,
    detailedIdx,
    setDetailedIdx,
    search,
    setSearch,
  } = useEventState();

  const [subFilter, setSubFilter] = useState([]);
  const [country, setCountry] = useState("");
  const [range, setRange] = useState([-3000, 2025]);
  const [viewMode, setViewMode] = useState("map");

  const mapRef = useRef();
  const detailRef = useRef();
  const globeRef = useRef();

  const handleFilterChange = (value) => {
    setFilter(value);
    if (value !== "À visiter") setSubFilter([]);
  };

  const handleShowDetail = (idx) => {
    setDetailedIdx(idx);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

  const handleCardClick = (idx) => {
    setSelected(idx);
    if (mapRef.current && viewMode === "map") {
      mapRef.current.flyToEvent(idx);
    }
  };

  const filteredEvents = filterEvents(filter, range, search, subFilter, country);

  return {
    search,
    setSearch,
    filterProps: {
      onFilter: handleFilterChange,
      active: filter,
      subFilter,
      onSubFilter: setSubFilter,
      country,
      onCountryChange: setCountry,
      range,
      onChange: setRange,
      labelMode: "above",
    },
    viewMode,
    setViewMode,
    filteredEvents,
    mapRef,
    globeRef,
    detailRef,
    selected,
    setSelected,
    detailedIdx,
    setDetailedIdx,
    handleShowDetail,
    handleCardClick,
  };
}
