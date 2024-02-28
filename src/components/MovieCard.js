import React, { useState, useEffect } from "react";
import "../MovieCard.css";

const MovieCard = ({ movie, mediaType }) => {
    const {
        title,
        name,
        poster_path,
        release_date,
        first_air_date,
        vote_average,
        genre_ids,
    } = movie;

    const [genres, setGenres] = useState([]);


    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const fetchGenres = async () => {
            try {
                let genreEndpoint;
                if (mediaType === "movie") {
                    genreEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
                } else if (mediaType === "tv") {
                    genreEndpoint = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
                }
                const response = await fetch(genreEndpoint);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error(`Error fetching ${mediaType} genres:`, error);
            }
        };

        fetchGenres();
    }, [mediaType]);

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

    const movieGenres = Array.isArray(genre_ids)
        ? genre_ids.map((genreId) =>
            genres.find((genre) => genre.id === genreId)?.name
        )
        : [];

    const limitedGenres = movieGenres.slice(0, 2);

    return (
        <div className="m-card">
            <div data-type={mediaType} className="m-card-content">
                <img src={posterPath} alt={title || name} className="m-card-image" />
                <div>
                    <h5 className="m-card-title">{title || name}</h5>
                    <div className="m-info-wrapper">
                        <p className={`m-card-rating ${ratingClass}`}>{ratingText}</p>
                        {genres.length > 0 && (
                            <p className="m-card-genres">
                                {limitedGenres.join(" | ")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
