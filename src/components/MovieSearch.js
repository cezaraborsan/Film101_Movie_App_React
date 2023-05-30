import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../MovieSearch.css";

const apiKey = process.env.REACT_APP_API_KEY;

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      return;
    }

    try {
      const MY_API_KEY = apiKey;

      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${MY_API_KEY}&language=en-US&query=${searchQuery}&page=1`
      );
      const data = response.data;
      const searchItems = data.results.slice(0, 25);

      // Clear the search input value
      setSearchQuery("");

      // Navigate to the search results page
      navigate("/search", { state: { searchResults: searchItems } });
    } catch (error) {
      console.error("Error searching movies and TV shows:", error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default MovieSearch;
