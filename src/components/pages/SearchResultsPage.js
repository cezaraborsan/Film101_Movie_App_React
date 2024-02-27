import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../MovieSearch.css";
import Loader from '../Loader'; // Import the Loader component
import MovieCard from '../MovieCard';

const SearchResultPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  // const imageReplacement = "../image_replacement.png";

  useEffect(() => {
    const fetchedResults = location.state?.searchResults || [];
    setSearchResults(fetchedResults);
    setLoading(false); // Set loading to false when data is fetched
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
              const {
                id,
                media_type,
              } = item;

              const linkUrl =
                media_type === "movie" ? `/movies/${id}` : `/tvshows/${id}`;
              // const posterPath = poster_path
              //   ? `https://image.tmdb.org/t/p/w500${poster_path}`
              //   : imageReplacement;

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

// // Helper function to determine rating color
// const getRatingColor = (rating) => {
//   if (rating < 5) return "red";
//   if (rating < 7.5) return "yellow";
//   if (rating >= 7.5) return "green";
//   return "gray";
// };

export default SearchResultPage;
