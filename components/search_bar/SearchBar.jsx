import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import './SearchBar.scss';
function SearchBar({ setSearchQuery }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search using the query variable
  };
  return (

    <form className="search-container"  onSubmit={handleSubmit}>
      <button type="submit" className='search-button'>
        <SearchIcon style={{ fill: "#523F8E", flexGrow: 1 }} />
      </button>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
        className='search-input'
      />

    </form>
  );
}
export default SearchBar;
