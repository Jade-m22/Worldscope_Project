export default function MainLayout({ header, sidebar, main }) {
  return (
    <div className="with-header">
      {header}
      <div className="app-layout">
        <aside className="sidebar">{sidebar}</aside>
        <main className="main-content">{main}</main>
      </div>
    </div>
  );
}
