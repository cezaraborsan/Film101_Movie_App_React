import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../MovieSearch.css";
import Loader from '../Loader'; // Import the Loader component
import MovieCard from '../MovieCard';

// ... (other imports)

const SearchResultPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedResults = location.state?.searchResults || [];
    setSearchResults(fetchedResults);
    setLoading(false);
  }, [location.state]);

  return (
    <div className="search-results">
      <h2>Your search results:</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="movie-card-container">
          {searchResults.length > 0 ? (
            searchResults.map((item) => {
              const { id, media_type } = item;

              // Dynamically generate the link URL based on the media type
              const linkUrl = `/${media_type}s/${id}`;

              return (
                <div key={id} className="movie-card">
                  <Link to={linkUrl}>
                    {/* Pass the entire item object as 'movie' prop */}
                    <MovieCard movie={item} />
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="no-results">No search results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
