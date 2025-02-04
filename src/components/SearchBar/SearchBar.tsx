// Navbar.tsx
import React from "react";
import "./SearchBar.css";
import searchIcon from "../../assets/search-icon.svg";

const SearchBar = () => {
  return (
    <div id="search-bar" className="searchBarContainer">
      <img src = {searchIcon} className="searchIcon" />
      <input type="text" className="searchInput"/>
    </div>
  );
};

export default SearchBar;
