import "./CardList.scss";

export default function CardList({ data = [], onCardClick }) {
  return (
    <div className="card-list">
      {data.map((item, i) => (
        <div
          className="card"
          key={i}
          onClick={() => onCardClick && onCardClick(i)}
          style={{ cursor: "pointer" }}
        >
          <h4>{item.title}</h4>
          <div className="country">{item.country}</div>
          <div className="type">{item.type}</div>
          <div className="year">{item.year}</div>
          <div className={`status status-${item.status.replace(/ /g, '').toLowerCase()}`}>{item.status}</div>
        </div>
      ))}
    </div>
  );
}
