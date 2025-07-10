import "./Sidebar.scss";
import Timeline from "./Timeline";
import Filters from "./Filters";

export default function Sidebar({ year, onYearChange }) {
  return (
    <aside className="sidebar">
      <Timeline year={year} onChange={onYearChange} />
      <Filters />
    </aside>
  );
}
