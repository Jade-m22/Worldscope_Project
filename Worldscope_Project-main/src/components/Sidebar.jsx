import Timeline from "./Timeline";
import Filters from "./Filters";

export default function Sidebar({ range, onRangeChange }) {
  return (
    <aside className="sidebar">
      <Timeline
        min={-3000}
        max={2025}
        range={range}
        onChange={onRangeChange}
        labelMode="above"
      />
      <Filters />
    </aside>
  );
}
