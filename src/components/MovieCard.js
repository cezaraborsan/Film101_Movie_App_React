import React from "react";
import "../MovieCard.css";

const MovieCard = ({ movie, mediaType, show }) => {
    const {
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



    return (
        <div className="m-card">
            <div data-type={mediaType} className="m-card-content">
                <img src={posterPath} alt={title || name} className="m-card-image" />
                <div >
                    <h5 className="m-card-title">{title || name}</h5>
                    <p className={`m-card-rating ${ratingClass}`}>{ratingText}</p>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;