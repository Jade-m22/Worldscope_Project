import { useState } from "react";

export default function useEventState() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [detailedIdx, setDetailedIdx] = useState(null);
  const [year, setYear] = useState(null);
  const [search, setSearch] = useState("");

  return {
    filter, setFilter,
    selected, setSelected,
    detailedIdx, setDetailedIdx,
    year, setYear,
    search, setSearch
  };
}