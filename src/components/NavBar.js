import React from "react";

export default function NavBar({ query, setQuery }) {
  return (
    <nav className="nav-container">
      <div className="logo">LOGO</div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
          // console.log(query);
        }}
        value={query}
      />
      <div>
        <p>X Result</p>
      </div>
    </nav>
  );
}
