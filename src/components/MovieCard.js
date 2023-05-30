import React from "react";
import { Link } from "react-router-dom";
import "../MovieCard.css";

const MovieCard = ({ movie, mediaType }) => {
  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = movie;

  const posterPath = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/image_replacement.png";

  const isReleased =
    (release_date && new Date(release_date) <= new Date()) ||
    (first_air_date && new Date(first_air_date) <= new Date());

  const ratingClass =
    isReleased && vote_average
      ? vote_average <= 5
        ? "red"
        : vote_average < 7.5
        ? "yellow"
        : "green"
      : "gray";

  const ratingText =
    isReleased && vote_average ? vote_average.toFixed(1) : "N/A";

  const linkUrl = release_date ? `/movies/${id}` : `/tvshows/${id}`;

  return (
    <div className="movie-card">
      <Link to={linkUrl}>
        <div className="card" data-type={mediaType}>
          <img src={posterPath} className="card-img-top" alt={title || name} />
          <div className="card-body">
            <h5 className="card-title">{title || name}</h5>
            <p className={`rating ${ratingClass}`}>{ratingText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
