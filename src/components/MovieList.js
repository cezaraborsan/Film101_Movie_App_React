import React from "react";
import { Link } from "react-router-dom";
import "../MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="top-rated-list">
      {movies.map((movie) => {
        const { id, title, name, release_date, first_air_date, vote_average } =
          movie;

        const releaseYear = release_date
          ? release_date.slice(0, 4)
          : first_air_date
          ? first_air_date.slice(0, 4)
          : "N/A";

        const ratingClass =
          vote_average < 5
            ? "red"
            : vote_average < 7.5
            ? "yellow"
            : vote_average > 7.5
            ? "green"
            : "gray";

        return (
          <div key={id} className="list-item">
            <div>
              <Link to={`/movies/${id}`}>
                <h5 className="title">{title || name}</h5>
              </Link>
              <p className="release-year">{releaseYear}</p>
            </div>
            <p className={`list-rating ${ratingClass}`}>
              {vote_average.toFixed(1)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
