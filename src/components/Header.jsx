import React from 'react';
import logo from '../assets/VERT_worldscope.webp';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="WorldScope Logo" className="logo" />
        <h1 className="title">WorldScope</h1>
      </div>
      <div className="header-right">
        <input
          type="text"
          placeholder="Rechercher un lieu, monument..."
          className="search-input"
        />
      </div>
    </header>
  );
}
