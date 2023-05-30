import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../MovieSearch.css";

const SearchResultPage = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const imageReplacement = "../image_replacement.png";

  return (
    <div className="search-results">
      <h2>Your search results:</h2>

      <div className="movie-card">
        {searchResults.length > 0 ? (
          searchResults.map((item) => {
            const {
              id,
              title,
              name,
              poster_path,

              vote_average,
              media_type,
            } = item;

            const linkUrl =
              media_type === "movie" ? `/movies/${id}` : `/tvshows/${id}`;
            const posterPath = poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : imageReplacement;

            return (
              <div key={id} className="card">
                <Link to={linkUrl}>
                  <img
                    src={posterPath}
                    className="card-img-top"
                    alt={title || name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title || name}</h5>
                    <p
                      className={`rating ${
                        vote_average < 5
                          ? "red"
                          : vote_average < 7.5
                          ? "yellow"
                          : vote_average >= 7.5
                          ? "green"
                          : "gray"
                      }`}
                    >
                      {vote_average && vote_average.toFixed(1)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="no-results">No search results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
